const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    database: 'facerecog',
  },
});

db.select('*').from('users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  db('users')
    .returning('*')
    .then(response => {
      console.log(response);
      res.json(response);
    });
});

//@DESC: '/signin'
//@Method: POST
//@DESC: Used to sign in users

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => {
            res.status(400).json({
              error: 'error finding credential',
              type: 'server side error',
            });
          });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: 'can not find email in db',
        type: 'server, DB side error',
      })
    })
});

//@DESC: '/register'
//@Method: POST
//@DESC: Used to sign in users
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  console.log(email, name, password);
  console.log(hash);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('unable to register'));
});

//@DESC: '/profile/:id'
//@Method: GET
//@DESC: Used to get profile info for a specific ID number...
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  console.log(id);
  database.users.forEach(user => {
    if (user.id === id) {
      let found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.status(404).json({
      error: 'There is no user profile attached with this ID',
    });
  }
});

//@DESC: '/image'
//@Method: PUT
//@DESC: Update the count of entries in the db....
app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if ((user.id = id)) {
      let found = true;
      user.entries++;
      return res.json(user.entries);
    }
    if (!found) {
      res.status(404).json({
        msg: 'No Such profile exists',
      });
    }
  });
});

app.listen(port, () => {
  console.log(`server started listening at port: ${port}`);
});

/*
'/'->          -> GET  request to show the list of users
'/signin'      -> POST request to signin user
'/register'    -> POST request to register user
'/profile/:id' -> GET request to get an individual user
'/image'       -> PUT request to get the entries count for user
*/
