import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
// import path from 'path';
// import { fileURLToPath } from 'url'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

// app.use(express.static(path.join(__dirname, 'public')))
// app.get('*name', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doeu' },
        { id: 3, name: 'Alice' },
        { id: 4, name: 'Bob' },
    ]
    res.json(users)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})