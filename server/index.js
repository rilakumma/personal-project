const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');

const authController = require('./controllers/auth_controller');
const userController = require('./controllers/user_controller');
const itemController = require('./controllers/item_controller');

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(process.env.CONNECTION_STRING).then(database=>{
    app.set('db', database);
}).catch(error =>{
    console.log('Error with massive', error);
})

app.use( express.static( `${__dirname}/../build` ) );

//user controller
app.get('/api/me', userController.getUser);
app.patch('/api/me/:id', userController.updateUsername);
//user authorization with auth0
app.post('/api/logout', authController.logout);
app.get('/auth/callback', authController.handleLogin);
// item controller
app.post('/api/items/:id', itemController.addItem);
app.get('/api/items/:id', itemController.getItems);
app.delete('/api/items/:user/:id', itemController.deleteItem);
app.patch('/api/items/:user/:id', itemController.editItem);

app.listen(4000, ()=>{
    console.log('Server is listening on port 4000!! ☁️ ☁️ ☁️ ☁️ ☁️');
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});