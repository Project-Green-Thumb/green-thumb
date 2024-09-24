const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

/*
 * CONTROLLERS
 */

const userController = require('./Controllers/userController.js');
const plantController = require('./Controllers/plantController.js');

/*
 * DATABASE
 */

mongoose
  .connect('mongodb://127.0.0.1:27017/green-thumb')
  .then(() => {
    console.log('Mongoose DB connected: ', result);
  })
  .catch((err) => {
    console.log('Failed to connect to the Mongoose DB: ', err);
  });

// parse every request object
app.use(express.json());

/*
 * SERVE STATIC FILES
 */

app.use('/', express.static(path.resolve(__dirname, './client/index.html')));

/*
 * ROUTE HANDLERS
 */

// User
app.post('/api/signup', userController.createUser, (req, res) => {
  res.sendStatus(200);
});
app.post('/api/login', userController.verifyUser, (req, res) => {
  res.sendStatus(200);
});

// Favorites
//fetch user's saved favorites
app.get('/api/plants', (req, res) => {});
//saving plant to user's favorite's     plantController.savePlant - make sure the  plant isn't saved userController.addPlant adding the plantid to the user's savedPlants attribute
app.post('/api/plants', (req, res) => {});

// Perenual API
app.get('/api/species', plantController.fetchSpecies, (req, res) => {
  console.log('res locals plants: ', res.locals.plants);
  res.status(200).json(res.locals.plants);
});
//fetch the care guide for the species
app.get('/api/species/details', (req, res) => {});

/*
 * GLOBAL ERROR HANDLER
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Caught uknown error in middleware',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.error(errObj.log);
  res.status(errObj.status).json('error: ' + errObj.message);
});

app.listen(3000);
