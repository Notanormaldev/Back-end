import express from 'express';


const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/data', (req, res) => {
  const data = {
    message: 'This is some sample data from the backend.'};
  res.json(data);
});

export default app;
