const express = require(express);
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const database = {
    users: [
        {
            name: 'Ashish Singh',
            id: '001',
            email: 'ashish@email.com',
            password: 'apple',
            entries: 0,
            joined: new Date()
        },
        {
            name: 'Rtik Rishu',
            id: '002',
            email: 'Ritik@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get('/', (req, res, next) => {
    res.send('this is the root route');
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && 
    req.boy.password === database.users[0].password) {
        res.json('success');
    } else (
        res.status(404).json({
            error: 'No such user exists';
        })
    )
})

app.listen(port, () => {
    console.log(`server started listening at port: ${port}`)
})

/*

        '/'-> show the list of users
'/signin'      -> POST request to signin user
'/register'    -> POST request to register user
'/profile/:id' -> GET request to get an individual user
'image/:id'    -> Update the entries count for user

*/