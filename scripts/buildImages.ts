import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import * as crypto from 'crypto';

interface LocationsMetadata {
    targetMaxFileSize: number;
    hashes: {
        [filename: string]: string;
    };
}

const pixelateFactor = 10;

console.log('Optimizing images. This may take a while...');

const basePath = path.join('images', 'areas');
const assetsPath = path.join('src', 'assets', basePath);
const publicPath = path.join('public', basePath);

// Want images to not be more than this many bytes.
const targetMaxFileSize = 1000000;

// Function to copy an image from source to destination.
function copyImage(srcPath: string, destPath: string): void {
    const destDir = path.dirname(destPath);

    // Create the destination directory if it doesn't exist.
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy the file.
    fs.copyFileSync(srcPath, destPath);
}

// Function to optimize an image with a given quality.
async function optimizeImage(
    inputPath: string,
    outputPath: string,
    quality: number,
  ): Promise<void> {
    // Determine file extension
    const extension = path.extname(inputPath).toLowerCase();
  
    // Choose sharp method based on file extension
    let sharpInstance;
    switch (extension) {
      case '.png':
        sharpInstance = sharp(inputPath).png({ quality });
        break;
      case '.jpeg':
      case '.jpg':
        sharpInstance = sharp(inputPath).jpeg({ quality });
        break;
      case '.webp':
        sharpInstance = sharp(inputPath).webp({ quality });
        break;
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }

    const metadata = await sharp(inputPath).metadata();
    const resizedWidth = Math.ceil(metadata.width! / pixelateFactor);
    const resizedHeight = Math.ceil(metadata.height! / pixelateFactor);
    
    // Apply rotation and save the image
    await sharpInstance.rotate().resize({
        width: resizedWidth,
        height: resizedHeight,
        fit: sharp.fit.fill,
      }).toFile(outputPath);
  }  

// Function to get the file size of an image.
function getFileSize(filePath: string): number {
    const stats = fs.statSync(filePath);
    return stats.size;
}

// Function to compute the hash of a file.
function computeFileHash(filePath: string): string {
    const fileContent = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5').update(fileContent).digest('hex');
    return hash;
}

// Function to read metadata from a file.
function readMetadata(filePath: string): LocationsMetadata {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } else {
        return {
            targetMaxFileSize: targetMaxFileSize,
            hashes: {},
        };
    }
}

// Function to write metadata to a file.
function writeMetadata(filePath: string, metadata: LocationsMetadata): void {
    const content = JSON.stringify(metadata, null, 4);
    fs.writeFileSync(filePath, content, 'utf-8');
}

// Binary search to find the optimal quality.
async function findOptimalQuality(
    inputPath: string,
    outputPath: string,
    startQuality: number,
    endQuality: number,
    targetFileSize: number,
): Promise<number | null> {
    let left = startQuality;
    let right = endQuality;
    let optimalQuality = null;
    let lastQuality = 0;

    while (left <= right) {
        let midQuality = Math.floor((left + right) / 2);

        await optimizeImage(inputPath, outputPath, midQuality);

        const midFileSize = getFileSize(outputPath);

        if (midFileSize <= targetFileSize) {
            optimalQuality = midQuality;
            left = midQuality + 1;
            lastQuality = midQuality;
        } else {
            right = midQuality - 1;
            // Ensure midQuality is at least 1 greater than the last successful
            // quality.
            if (lastQuality > 0) {
                midQuality = Math.min(lastQuality + 1, right);
            }
        }
    }

    return optimalQuality;
}

// Get all folders in the `assets/images` folder.
const areaFolders = fs
    .readdirSync(assetsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Loop through each area folder.
areaFolders.forEach((areaFolder) => {
    const areaFolderPath = path.join(assetsPath, areaFolder);
    const locationsFolderPath = path.join(areaFolderPath, 'locations');
    const metadataFilePath = path.join(
        areaFolderPath,
        'locations.metadata.json',
    );

    const supportedFileTypes = /\.(jpe?g|png|gif|bmp|tiff|webp)$/i;

    // Read existing metadata or initialize an empty object.
    const metadata = readMetadata(metadataFilePath);

    // Get all files in the `locations` folder.
    const imageFiles = fs
        .readdirSync(locationsFolderPath)
        .filter((file) => supportedFileTypes.test(file));

    // Loop through each image file.
    imageFiles.forEach(async (imageFile) => {
        const inputPath = path.join(locationsFolderPath, imageFile);
        const publicOutputPath = path.join(
            publicPath,
            areaFolder,
            'locations',
            imageFile,
        );

        const assetFileSize = getFileSize(inputPath);
        const assetFileHash = computeFileHash(inputPath);

        // Check if the image is already correctly optimized in the public
        // folder.
        if (
            fs.existsSync(publicOutputPath) &&
            getFileSize(publicOutputPath) <= targetMaxFileSize &&
            (computeFileHash(publicOutputPath) === assetFileHash ||
                (metadata.hashes[imageFile] === assetFileHash &&
                    metadata.targetMaxFileSize === targetMaxFileSize))
        ) {
            console.log(`Already optimized: ${publicOutputPath}`);
        } else if (assetFileSize <= targetMaxFileSize) {
            // If the file size in the assets folder is already below the limit,
            // copy it.
            copyImage(inputPath, publicOutputPath);
            metadata.hashes[imageFile] = assetFileHash; // Update or add entry in metadata.
            writeMetadata(metadataFilePath, metadata); // Save updated metadata.
            console.log(
                `Copied (original already optimized): ${publicOutputPath}`,
            );
        } else {
            // Binary search for optimal quality.
            const optimalQuality = await findOptimalQuality(
                inputPath,
                publicOutputPath,
                1,
                100,
                targetMaxFileSize,
            );

            if (optimalQuality !== null) {
                // Optimize image with the found quality.
                await optimizeImage(
                    inputPath,
                    publicOutputPath,
                    optimalQuality,
                );
                metadata.hashes[imageFile] = assetFileHash; // Update or add entry in metadata.
                writeMetadata(metadataFilePath, metadata); // Save updated metadata.
                console.log(`Optimized: ${publicOutputPath}`);
            } else {
                throw Error(`Could not optimize: ${publicOutputPath}`);
            }
        }
    });

    metadata.targetMaxFileSize = targetMaxFileSize;
});
