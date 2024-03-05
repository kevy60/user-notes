const express = require('express')
const sequelize = require('./utils/db')
const sessions = require('express-session')

const User = require('./models/user')
User.sync()

const Note = require('./models/note')
sequelize.sync();


const app = express()

app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const usersRoutes = require('./routes/users')
const notesRoutes = require('./routes/notes')

app.use('/users', usersRoutes)
app.use('/notes', notesRoutes) 

app.listen(3005, () => {
    console.log('server is connected')
})