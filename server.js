// require dependencies
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001;
const app = express();



const routes = require("./routes");

// // Routes - list of all route files
// const numberGame = require('./routes/numbergame.routes') WE MIGHT NOT NEED THIS ANYMORE

// allows you to use nexted js objects together
app.use(bodyParser.urlencoded({ extended: true }));

// allows you to manipulate json
app.use(bodyParser.json());
// // use number game routes
// app.use('/', numberGame);
// Serve up static assets (usually on heroku)
// app.use(require('./routes'));
app.use(routes);


// Seeds - comment out if you dont want to spam your db lol - To do: move to scripts folder
// const numberGameSeeds = require('./scripts/seeds').seedNumberGame()


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/timeoutDB';

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);



app.get('/', (req, res) => {
  res.sendFile(__dirname, './client/public/index.html')
});
 
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

