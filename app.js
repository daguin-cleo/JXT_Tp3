const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users-v1')
const app = express()
const port = process.env.PORT || '3000'

app.use(bodyParser.json())
app.use('/v1/users', usersRouter)
app.listen(port)