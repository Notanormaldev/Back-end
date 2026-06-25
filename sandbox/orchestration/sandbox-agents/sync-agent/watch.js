import chokidar from 'chokidar';
import { createReadStream } from 'fs';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
});

const SANDBOX_ID = process.env.SANDBOX_ID;
const S3_BUCKET = process.env.S3_BUCKET;
const WATCH_DIR = '/workspace';

const getS3Key = (filePath) => {
    const relative = path.relative(WATCH_DIR, filePath);
    return `${SANDBOX_ID}/${relative}`;
};

const uploadFile = async (filePath) => {
    try {
        const key = getS3Key(filePath);
        await s3.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: createReadStream(filePath),
        }));
        console.log('synced:', key);
    } catch (err) {
        console.error('upload error:', err.message);
    }
};

const deleteFile = async (filePath) => {
    try {
        const key = getS3Key(filePath);
        await s3.send(new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
        }));
        console.log('deleted:', key);
    } catch (err) {
        console.error('delete error:', err.message);
    }
};

chokidar.watch(WATCH_DIR, {
    ignored: [ '**/node_modules/**', '**/.git/**', '**/dist/**' ],
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
})
    .on('add', uploadFile)
    .on('change', uploadFile)
    .on('unlink', deleteFile);

console.log(`watching ${WATCH_DIR} for changes...`);