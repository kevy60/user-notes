const express = require('express')
const sequelize = require('./utils/db')

const app = express()

app.use(express.json())

app.listen(3005, () => {
    console.log('server is connected')
})