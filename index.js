const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("Thanks for visiting!");
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n >>** Running on port ${port} **<<\n`));