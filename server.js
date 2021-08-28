const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
   /*host: ''
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'*/
  
});


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {res.send('success')});
app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)} );
app.put('/image', (req,res) => {image.handleImage(req,res,db)});
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)});
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running at port ${process.env.PORT}`);
})

/*
db.select('*').from('users').where({
		id: id
	})
	=>
db.select('*').from('users').where({id})
ES6
*/

/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
/*
 / --> res = this is working
 /signin --> POST = success/ fail // because of password , we use POST
 /register --> POST = user
 /profile/:userId --> GET = user
 /image --> PUT = user (updated)

*/