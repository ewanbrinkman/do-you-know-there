import * as fs from 'fs';
import sharp from 'sharp';

const areasPath = 'public/areas';

// Want images to not be more than 1MB.
const targetMaxFileSize = 1000000;

// Function to optimize an image with a given quality.
async function optimizeImage(
    inputPath: string,
    outputPath: string,
    quality: number,
): Promise<void> {
    // .rotate() makes sure the images don't rotate (so it preserves the original orientation).
    await sharp(inputPath).rotate().jpeg({ quality }).toFile(outputPath);
}

// Function to get the file size of an image.
function getFileSize(filePath: string): number {
    const stats = fs.statSync(filePath);
    return stats.size;
}

// Get all folders in the `areas` folder.
const areaFolders = fs
    .readdirSync(areasPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

// Loop through each area folder.
areaFolders.forEach((areaFolder) => {
    const areaFolderPath = `${areasPath}/${areaFolder}`;
    const locationsFolderPath = `${areaFolderPath}/locations`;

    // Get all files in the `locations` folder.
    const imageFiles = fs
        .readdirSync(locationsFolderPath)
        .filter((file) => file.endsWith('.jpeg') || file.endsWith('.jpg'));

    // Loop through each image file.
    imageFiles.forEach(async (imageFile) => {
        const inputPath = `${locationsFolderPath}/${imageFile}`;
        const tempOutputPath = `${locationsFolderPath}/temp_${imageFile}`;

        // Check the resulting file size.
        let resultingFileSize = getFileSize(inputPath);

        let optimizedImage = false;
        // If the file size is still above the target, apply file size reduction.
        for (
            let imageQuality = 80;
            resultingFileSize > targetMaxFileSize && imageQuality >= 1;
            imageQuality -= 1
        ) {
            optimizedImage = true;
            await optimizeImage(inputPath, tempOutputPath, imageQuality);

            // Check the file size again if needed.
            resultingFileSize = getFileSize(tempOutputPath);
        }

        if (optimizedImage) {
            fs.unlinkSync(inputPath);
            fs.renameSync(tempOutputPath, inputPath);
        }

        console.log(`Optimized: ${inputPath}`);
    });
});
