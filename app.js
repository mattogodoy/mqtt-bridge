var express = require('express');
var app = express();
var port = 8001;
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var mqtt = require('mqtt');

app.use(urlencode);

app.post('/mqtt/pub', function(req, res){
  // host [ws://test.mosquitto.org]
  // port [1883]
  // options: { user: [none], password: [none] }
  // qos [0]
  // topic
  // message

  if(!req.body.host || !req.body.topic || !req.body.message){
    console.log(req.body);
    res.json('ERROR: Please specify host, topic and message');
    return;
  }

  // var client = mqtt.connect('ws://test.mosquitto.org:8080/mqtt');
  var client = mqtt.connect(req.body.host, req.body.options || {});

  client.on('connect', function () {
    client.publish(req.body.topic, req.body.message, req.body.qos || 0, function(err){
      if(err){
        console.log(JSON.stringify(err));
        res.json('ERROR: ' + JSON.stringify(err));
      } else {
        res.json('ok');
      }
    });
  });

  client.on('error', function(err){
    console.log(JSON.stringify(err));
    res.json('ERROR: ' + JSON.stringify(err));
  })
});

app.listen(port, function(){
  console.log('Listening on port', port);
});