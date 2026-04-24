require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
connectDB()

const authRoutes = require('./modules/auth/routes')
const recRoutes = require('./modules/recommend/routes')
const authMiddleware = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/recommend', authMiddleware, recRoutes)

app.get('/', (req, res) => {
    res.send('BACKEND RUNNING!')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})