const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const spawn = require('child_process').spawn;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/user');
router.use(bodyParser.json());




const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/Users", options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose Up conncted on port', db['port'])
});

const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
      if (err) return console.log(err);

      closure(db);
  });
};


//error handeling
const sendError = (err, res) => {
  response.status = 501;
  response.messgae = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Responce handeling
let response = {
  status: 200,
  data: [],
  message: null
};

//execute python code
router.post('/NewGame', (req, res) => {
        const {deck1, deck2} = req.body
        const ls = spawn('python', ['preparegame.py', '--D1', deck1, '--D2', deck2]);

        ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        response.data = "New game created";
        res.json(response);
        res.send()
      });

router.post('/NewDeck', (req, res) => {
        const {name, decklist} = req.body
        const ls = spawn('python', ['createdeck.py', '--N', name, '--D', decklist]);

        ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        response.data = "New Deck Created";
        res.json(response);
        res.send()
      });

router.get('/', (req, res) => {
  var responseObject = { message : 'hey' };
  res.send(responseObject)
});

router.post('/login', async (req, res) =>{
  console.log(req.body)
  const {username, password} = req.body
  const resp = await User.find({})
  console.log(resp)


    if(!resp) {
        console.log("incorrect Details")
        res.json({
          success: false,
          message: "Incorrect Details"
        })
    } else {
        console.log("logging you in")
        res.json({
          success: true,
          message: "Logged In"
    })
  }
    res.send()
})

router.post('/register', async (req, res) =>{
  const {username, password, cpassword} = req.body
  const existingUser = User.findOne({username})
  console.log(existingUser)
  if (existingUser) {
    res.json({
      Sucess: false,
      message: "Username already in use"
    })
    return
  }


})


module.exports = router;
