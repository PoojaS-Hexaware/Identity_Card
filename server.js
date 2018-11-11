//var express = require('express');
var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
/*global.speech = {
  name:null,
  email:null,
  number:null,
  Designation:null,
};*/


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', function (req, res) {
 //global.speech = req.outputContexts.parameters.any;
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.listen(port, function () {
 console.log(`Example app listening on port !`);
});


app.post("/demo", function(req, res) {
    /*global.speech =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.any
        ? req.body.result.parameters.any
        : "Seems like some problem. Speak again.";*/
      if (req.body.result.parameters.any) {
        if (!req.body.result.parameters.email) {
          res.json({
            speech: "Give your email Id",
            displayText: "Give your email Id", 
            source: "webhook"
          })
        }
      }
      if (req.body.result.parameters.email) {
          if (!req.body.result.parameters.number) {
            return res.json({
              speech: "Give your number",
              displayText: "Give your number", 
              source: "webhook"
            })
          }
          if (!req.body.result.Designation) {
            return res.json({
              speech: "Give your Designation" ,
              displayText: "Give your Designation" , 
              source: "webhook"
            })
          }
        }
        if (req.body.result.Designation) {
          return res.json({
            speech: req.body.result.parameters.any,
            displayText: "Id successfully submitted!!",
            source: "webhook"
          });
        }
    });

   
 
