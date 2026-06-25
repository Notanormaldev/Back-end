import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import nodepty from 'node-pty-prebuilt-multiarch';
import { existsSync } from 'fs';

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

const server = http.createServer(app);
const io = new Server(server, {
    transports: [ "websocket" ],
    cors: { origin: "*" }
});

const getShell = () => {
    const shells = [ '/bin/bash', '/bin/sh', '/bin/zsh', '/bin/ash' ];
    for (const shell of shells) {
        if (existsSync(shell)) return shell;
    }
    throw new Error('No shell found');
};

const createPty = () => {
    const shell = getShell();
    console.log('spawning shell:', shell);

    const args = shell.includes('zsh') ? [ '--no-rcs', '--no-globalrcs' ] : [];

    const pty = nodepty.spawn(shell, args, {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: '/workspace',
        env: {
            TERM: 'xterm-color',
            HOME: process.env.HOME || '/root',
            PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
            LANG: 'en_US.UTF-8',
            SHELL: shell,
        }
    });

    pty.onData((data) => {
        io.emit('pty-output', data);
    });

    pty.onExit(({ exitCode, signal }) => {
        console.log('pty exited — code:', exitCode, 'signal:', signal);
        io.emit('pty-output', '\r\n[shell exited, restarting...]\r\n');
        // restart after a short delay
        setTimeout(() => {
            ptyProcess = createPty();
        }, 1000);
    });

    return pty;
};

let ptyProcess = createPty();

io.on('connection', (socket) => {
    console.log('client connected');

    socket.on('pty-input', (message) => {
        ptyProcess.write(message);
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Agent running on http://localhost:3000');
});

export default app;