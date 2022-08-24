const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const port = process.env.PORT || 5000
const connectDB= require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

const todoRoutes = require('./routes/todoRoutes')

connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use('/api/todo', todoRoutes)

app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started on port ${port}`))