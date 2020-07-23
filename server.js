const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ API: 'RUNNING...' });
});

module.exports = server;