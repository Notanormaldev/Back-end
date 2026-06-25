import express from 'express';
import morgan from 'morgan';
import sandboxRoutes from './routes/sandbox.routes.js';


const app = express();

app.use(morgan('dev'));

app.use('/api/sandbox', sandboxRoutes);

export default app;