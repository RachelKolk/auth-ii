 const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const secret = 'goats eat oats and does eat oats';

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("Thanks for visiting!");
});

server.post('/api/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 9);

    user.password = hash;

    Users.add(user)
      .then(saved => {
          res.status(201).json(saved);
      })
      .catch(err => {
          res.status(500).json(err);
      });
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n >>** Running on port ${port} **<< \n`));