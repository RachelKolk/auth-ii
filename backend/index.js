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

//creates a user and hashes the password before saving it to the db
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

//the below function generates a user token for authentication
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secret, options);
}

//use login info sent by user to authenticate the user as registered
server.post('/api/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({username})
      .first()
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);
              res.status(200).json(token);
          } else {
              res.status(401).json({message: 'You shall not pass!'});
          }
      })
      .catch(err => {
          res.status(500).json(err);
      });
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n >>** Running on port ${port} **<< \n`));