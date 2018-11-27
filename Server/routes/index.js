const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const bodyParser = require('body-parser');
const User = require('../models/user');
router.use(bodyParser.json());

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


router.get('/', (req, res) => {
  var responseObject = { message : 'hey' };
  res.send(responseObject)
});


//execute python code
router.post('/NewGame', (req, res) => {
        const {deck1, deck2} = req.body
        const child = spawn('python', ['preparegame.py', '--D1', deck1, '--D2', deck2]);

        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        child.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        child.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        response.data = "New game created";
        res.json(response);
        res.send()
      });

router.post('/NewDeck', (req, res) => {
        const {name, decklist} = req.body
        const child = spawn('python', ['createdeck.py', '--N', name, '--D', decklist]);

        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        child.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        child.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        response.data = "New Deck Created";
        res.json(response);
        res.send()
      });

router.post('/login', (req, res) =>{
  console.log(req.body)
  const {username, password} = req.body
  const resp = spawn('python', ['mylogin.py', '--U', username, '--P', password]);
  resp.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

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

router.post('/register', (req, res) =>{
  console.log(req.body)
  const {email, username, password, cpassword} = req.body
  const resp = spawn('python', ['mylogin.py', '--U', username, '--P', password, '--E', email, '--C', cpassword]);
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


module.exports = router;
