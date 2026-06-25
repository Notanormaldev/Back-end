import fs from 'fs';
import path from 'path';

const prebuildsDir = path.join(process.cwd(), 'node_modules', 'node-pty', 'prebuilds');

function ensureExecutable(filePath) {
    try {
        fs.chmodSync(filePath, 0o755);
        console.log(`Set executable permission on ${filePath}`);
    } catch (error) {
        console.warn(`Could not set executable permission on ${filePath}: ${error.message}`);
    }
}

if (!fs.existsSync(prebuildsDir)) {
    process.exit(0);
}

for (const platformDir of fs.readdirSync(prebuildsDir)) {
    const helperPath = path.join(prebuildsDir, platformDir, 'spawn-helper');
    if (fs.existsSync(helperPath)) {
        ensureExecutable(helperPath);
    }
}
