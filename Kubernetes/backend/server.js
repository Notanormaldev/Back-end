import express from 'express';


const app = express();


app.get('/', (req, res) => {
    let sum=0;
    for(let i=0; i<1000000000; i++) {
        sum+=i;
    } // Simulate a long-running task
    res.send(`Task completed! Sum: ${sum}`);
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});