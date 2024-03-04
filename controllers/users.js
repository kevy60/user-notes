const bcrypt  = require('bcrypt')
const User = require('../models/user')

const login = (req, res) => {
    console.log(req.body);

    // Kontrollib, kas kasutajatunnus ja parool on saadetud
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Võrdleb saadetud parooli andmebaasis olevaga
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error || !result) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
                req.session.user = {
                    username: user.username,
                    user_id: user.id,
                };
                console.log(req.session)
                res.json({
                    message: 'User logged in successfully',
                    user: user,
                    user_session: req.session.user
                })
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

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

module.exports = { register, login };
