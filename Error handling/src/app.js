import express from 'express'
import Userroute from './routes/auth.route.js';
import errorhandling from './middleware/errorhandling.js';



const app = express()
app.use(express.json())
app.use('/api/auth',Userroute)

app.use(errorhandling)
export default app;