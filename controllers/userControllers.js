const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Ajout de l'importation de jwt

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'User created successfully'
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error.message
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            });
        });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Auth Failed' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (!result) {
                        return res.status(401).json({ message: 'Auth Failed' });
                    }

                    const token = jwt.sign(
                        { email: user.email, userId: user.id },
                        'HASKEY',   
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({
                        token: token,
                        userId: user.id
                    });
                })
                .catch(err => {
                    return res.status(401).json({ message: 'Auth Failed' });
                });
        })

};
