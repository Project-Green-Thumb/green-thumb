const express = require('express');//requires in express
const path = require('path');//requires in path for better path's
//body-parser
const app = express();//makes a express app
const mongoose = require('mongoose');//requires in mongoose
const userController = require(path.join(__dirname, './Controllers/userController.js'))

mongoose.connect('mongodb://127.0.0.1:27017/green-thumb')
.then( (result) => {
    //console.log('Mongoose DB connected', result);
})
.catch((err) => {
    console.log('Failed to connect to the Mongoose DB', err);
})


//have case's to handle json
app.use(express.json());

//router handlers
//create user document in user model
app.post('/api/signup', userController.createUser, (req, res) => {
    res.sendStatus(200);
});
//find matching username and verifying password, potentially creating a session
app.get('/api/login', userController.verifyUser, (req, res) => {
    res.sendStatus(200);
});

//fetch user's saved favorites
app.get('/api/plants', (req, res) => {

});
//saving plant to user's favorite's     plantController.savePlant - make sure the  plant isn't saved userController.addPlant adding the plantid to the user's savedPlants attribute
app.post('/api/plants', (req, res) => {

});

//fetching all plants that make search querry
app.get('/api/species', (req, res) => {

});

//fetch the details for the species
app.get('/api/species/details', (req, res) => {

});


//global error handler
app.use((err, req, res, next) => {
    console.log(err);
     const errObj = Object.assign({message: 'Unknown erro caught by error handler'} ,err)
    res.status(500).json(errObj);
});



app.listen(3000);//Set's up our backend server to listen in on port 3000