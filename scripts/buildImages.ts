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

console.log('Optimizing images. This may take a while...');

const basePath = path.join('images', 'areas');
const assetsPath = path.join('src', 'assets', basePath);
const publicPath = path.join('public', basePath);

// Want images to not be more than this many bytes.
const targetMaxFileSize = 500000;

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
    pixelateFactor: number,
): Promise<void> {
    // Determine file extension
    const extension = path.extname(inputPath).toLowerCase();

    const quality = 80;

    // Choose sharp method based on file extension.
    let sharpInstance = sharp(inputPath).rotate();
    switch (extension) {
        case '.png':
            sharpInstance = sharpInstance.png({ quality });
            break;
        case '.jpeg':
        case '.jpg':
            sharpInstance = sharpInstance.jpeg({ quality });
            break;
        case '.webp':
            sharpInstance = sharpInstance.webp({ quality });
            break;
        default:
            throw new Error(`Unsupported file type: ${extension}`);
    }

    const metadata = await sharpInstance.metadata();
    const resizedWidth = Math.ceil(metadata.width! / pixelateFactor);

    // Save the image after the resize. For the resize, only specify width,
    // since with "fit: sharp.fit.contain", the original aspect ratio is
    // preserved.
    await sharpInstance
        .resize({
            width: resizedWidth,
            fit: sharp.fit.contain,
        })
        .toFile(outputPath);
}

// Function to get the file size of an image.
function getFileSize(filePath: string): number {
    const stats = fs.statSync(filePath);
    return stats.size;
}

// Function to compute the hash of a file.
function computeFileHash(filePath: string): string {
    const fileContent = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha512').update(fileContent).digest('hex');
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
async function findOptimalPixelFactor(
    inputPath: string,
    outputPath: string,
    targetFileSize: number,
): Promise<number> {
    let fileSize: number;
    let pixelFactor = 1;
    do {
        pixelFactor += 0.1;
        await optimizeImage(inputPath, outputPath, pixelFactor);
        fileSize = getFileSize(outputPath);
    } while (fileSize > targetFileSize);

    return pixelFactor;
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
    const metadataFilePath = path.join(areaFolderPath, 'metadata.json');

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
            await findOptimalPixelFactor(
                inputPath,
                publicOutputPath,
                targetMaxFileSize,
            );
            metadata.hashes[imageFile] = assetFileHash; // Update or add entry in metadata.
            writeMetadata(metadataFilePath, metadata); // Save updated metadata.
            console.log(`Optimized: ${publicOutputPath}`);
        }
    });

    metadata.targetMaxFileSize = targetMaxFileSize;
});
