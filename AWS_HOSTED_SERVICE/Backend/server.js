import express from 'express'


const app = express()
const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'Alice' },
        { id: 4, name: 'Bob' },
    ]
    res.json(users)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})