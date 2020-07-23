const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./serverModel');
const restricted = require('./authentication-middleware');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ API: 'RUNNING...' });
});

server.post('/api/register/', (req, res) => {
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 6);
    credentials.password = hash;

    if ( credentials.username && credentials.password && credentials.deparment) {
        Users.add(credentials)
            .then(user => {
                res.status(200).json({ message: 'Successfully created account!' });
            })
            .catch(err => {
                res.status(500).json({ message: 'Error when adding account to database.' });
            })
    } else {
        res.status(400).json({ message: 'Make sure username, password, and deparment are filled in.' });
    }
});

server.post('/api/login/', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(user => {
            if ( user &&  bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ message: `Loggen In, Welcome ${username}!`, token });
            } else {
                res.status(401).json({ message: 'Invalid credentials.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err });
        })
});

server.get('/api/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users, decodedToken: req.decodedToken })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});

const generateToken = (user) => {
    const secret = 'Keep it a secret.';
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options)
};

module.exports = server;