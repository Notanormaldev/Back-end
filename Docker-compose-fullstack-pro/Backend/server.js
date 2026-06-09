import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();


app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(cors());    

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is some data from the server!' });
});



app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    res.json(users);
}); 

  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});