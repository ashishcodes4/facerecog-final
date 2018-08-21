const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = {
  users: [
    {
      name: 'Ashish Singh',
      id: '001',
      email: 'ashish@email.com',
      password: 'apple',
      entries: 0,
      joined: new Date(),
    },
    {
      name: 'Rtik Rishu',
      id: '002',
      email: 'Ritik@email.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res, next) => {
  res.send(database.users);
});

//@DESC: '/signin'
//@Method: POST
//@DESC: Used to sign in users
// app.post('/signin', (req, res) => {
//   const { email, password } = req.body;
//   let found = false;
//   console.log(typeof email, typeof password);

//   database.users.forEach(user => {
//     if (email === user.email && password === user.password) {
//       let found = true;
//      return res.send(user);
//     }
//     if (!found) {
//       return res.status(404).json({
//         msg: 'No Such User Exists',
//       });
//     }
//   });
// });

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json('success');
  } else {
    res.status(404).json('error logging in');
  }
});

//@DESC: '/register'
//@Method: POST
//@DESC: Used to sign in users
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let secPass;
  
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });

  const newUser = {
    name: name,
    id: '003',
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  };
  database.users.push(newUser);
  res.json(newUser);
});

// // Load hash from your password DB.
// bcrypt.compare('bacon', hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare('veggies', hash, function(err, res) {
//   // res = false
// });

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
