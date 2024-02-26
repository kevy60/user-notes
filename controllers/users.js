const bcrypt  = require('bcrypt')
const User = require('../models/user')


const register = (req, res) => {
    console.log(req.body)
    
    // Kontrollib, kas nimi on juba olemas 
    User.findOne({ where: { username: req.body.username } })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            } else {
                // Kontrollib, parooli pikkust
                if (req.body.password.length < 8) {
                    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
                }
                bcrypt.hash(req.body.password, 10, (error, cryptPassword) => {
                    User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: cryptPassword
                    })
                    .then((registered) => {
                        req.session.user = {
                            username: registered.username,
                            user_id: registered.id,
                        };
                        console.log(req.session)
                        res.json({
                            message: 'New user is registered',
                            user: registered,
                            user_session: req.session.user
                        })
                    })
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

module.exports = { register }
