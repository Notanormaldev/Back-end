import express from 'express'
import morgan from 'morgan'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello world")
})

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
        { id: 3, name: "Bob Smith" },
    ])
})

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})