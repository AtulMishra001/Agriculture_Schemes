import fs from 'fs/promises';
import path from 'path';

/**
 
    @param {Array<Object>} files 
    @param {string} [relativeTargetDir='public/image'] 
    @returns {Promise<Array<Object>>} 
    @throws {Error} 
 */
async function saveUploadedFiles(files, relativeTargetDir = 'public/image') {
    if (!Array.isArray(files)) {
        throw new Error('Invalid input: files parameter must be an array.');
    }

    if (files.length === 0) {
        return []; 
    }


    const projectRoot = process.cwd();
    const absoluteTargetDir = path.join(projectRoot, relativeTargetDir);

    try {

        await fs.mkdir(absoluteTargetDir, { recursive: true });
    } catch (error) {
        console.error(`Error creating directory ${absoluteTargetDir}:`, error);
        throw new Error(`Failed to create target directory: ${error.message}`);
    }

    const savedFileInfos = [];

    for (const file of files) {
        if (!file || typeof file.originalname !== 'string' || !Buffer.isBuffer(file.buffer)) {
            console.warn('Skipping invalid file object:', file);
            continue;
        }


        const sanitizedOriginalName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
        const uniqueFilename = `${Date.now()}-${sanitizedOriginalName}`;
        const absoluteFilePath = path.join(absoluteTargetDir, uniqueFilename);

        try {
            await fs.writeFile(absoluteFilePath, file.buffer);

            const publicPath = path.join('/', relativeTargetDir.replace(/^public[\\/]?/, ''), uniqueFilename).replace(/\\/g, '/');

            savedFileInfos.push({
                originalName: file.originalname,
                filename: uniqueFilename,
                path: absoluteFilePath,
                publicPath: publicPath,
                size: file.buffer.length,
                mimetype: file.mimetype || 'application/octet-stream',
            });
        } catch (error) {
            console.error(`Error saving file ${file.originalname} to ${absoluteFilePath}:`, error);
            throw new Error(`Failed to save file ${file.originalname}: ${error.message}`);
        }
    }

    return savedFileInfos;
}

export default saveUploadedFiles;