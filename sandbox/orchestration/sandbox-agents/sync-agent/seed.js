// seed.js — runs as init container, populates /app then exits
import { createReadStream } from 'fs';
import { readdir, copyFile, mkdir } from 'fs/promises';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
});

const SANDBOX_ID = process.env.SANDBOX_ID;
const S3_BUCKET = process.env.S3_BUCKET;
const WATCH_DIR = '/workspace';
const TEMPLATE_DIR = '/template';
const SKIP = new Set([ 'node_modules', '.git', 'dist', '.DS_Store' ]);

const sandboxExistsInS3 = async () => {
    try {
        const response = await s3.send(new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: `${SANDBOX_ID}/`,
            MaxKeys: 1,
        }));
        return response.KeyCount > 0;
    } catch (err) {
        console.error('S3 list error:', err.message);
        return false;
    }
};

const downloadFromS3 = async () => {
    console.log('existing sandbox — downloading files from S3...');
    const response = await s3.send(new ListObjectsV2Command({
        Bucket: S3_BUCKET,
        Prefix: `${SANDBOX_ID}/`,
    }));
    for (const obj of response.Contents || []) {
        const relativePath = obj.Key.replace(`${SANDBOX_ID}/`, '');
        if (!relativePath) continue;
        const localPath = path.join(WATCH_DIR, relativePath);
        await mkdir(path.dirname(localPath), { recursive: true });
        const { Body } = await s3.send(new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: obj.Key,
        }));
        await pipeline(Body, createWriteStream(localPath));
        console.log('downloaded:', relativePath);
    }
};

const seedFromTemplate = async () => {
    console.log('new sandbox — seeding from template...');
    const uploadDir = async (dir) => {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (SKIP.has(entry.name)) continue;
            const srcPath = path.join(dir, entry.name);
            const relativePath = path.relative(TEMPLATE_DIR, srcPath);
            const destPath = path.join(WATCH_DIR, relativePath);
            if (entry.isDirectory()) {
                await mkdir(destPath, { recursive: true });
                await uploadDir(srcPath);
            } else {
                await mkdir(path.dirname(destPath), { recursive: true });
                await copyFile(srcPath, destPath);
                await s3.send(new PutObjectCommand({
                    Bucket: S3_BUCKET,
                    Key: `${SANDBOX_ID}/${relativePath}`,
                    Body: createReadStream(destPath),
                }));
                console.log('seeded:', relativePath);
            }
        }
    };
    await uploadDir(TEMPLATE_DIR);
};

const installDependencies = async () => {
    console.log('installing dependencies in /app...');
    const { stdout, stderr } = await execAsync('npm install', { cwd: WATCH_DIR });
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    console.log('dependencies installed');
};

// ── Main — fully async, Node won't exit until this resolves ───
const main = async () => {
    const exists = await sandboxExistsInS3();
    if (exists) {
        await downloadFromS3();
    } else {
        await seedFromTemplate();
    }

    await installDependencies(); // awaited inside async main

    console.log('seed complete — /app is ready');
};

main().catch((err) => {
    console.error('seed failed:', err);
    process.exit(1);
});