const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app=express();


//parsers
app.use(bodyParser.urlencoded({extended: false}));

//angular dist output folder
app.use(express.static(path.join(__dirname,'dist')));

//api location
app.use('/api', require('./routes/index'));

app.use(bodyParser.json())
//Send all other request to angular app
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, '/'));
});
//set port
const port = process.env.port || '4200';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`running on local host:${port}`));
