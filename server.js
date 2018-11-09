//var express = require('express');
var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
global.speech = {
  name:null,
  email:null,
  number:null,
  Designation:null,
};

speech.name = req.body.result.parameters.any;
speech.email = req.body.result.parameters.email;
speech.number = req.body.result.parameters.number;
speech.Designation = req.body.result.parameters.Designation;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', function (req, res) {
 //global.speech = req.outputContexts.parameters.any;
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.listen(port, function () {
 console.log(`Example app listening on port !`);
});



app.post("/CreateIdCard", function(req, res) {
    /*global.speech =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.any
        ? req.body.result.parameters.any
        : "Seems like some problem. Speak again.";*/

    
    return res.json({
      speech: speech.name,
      displayText: "Id card request submitted successfully!",
      source: "webhook"
    });
  });