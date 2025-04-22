require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./Birthday-Reminder-main/routes/userRoutes')
const birthdayJob = require('./Birthday-Reminder-main/config/cron')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Routes
app.use('/api', userRoutes)

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Start cron job
birthdayJob.start()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
