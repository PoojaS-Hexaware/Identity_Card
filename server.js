//var express = require('express');
var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var requestCard = [ 
  name = null,
  email  = null,
  number = null,
  Designation = null
];
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
/*global.speech =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.any
        ? req.body.result.parameters.any
        : "Seems like some problem. Speak again.";*/

app.post("/demo", function(req, res) {
  if (req.body.result.metadata.intentName == "CreateIdCard") {
    if (!req.body.result.parameters.any) {
      return res.json({
        speech: "Give your name",
        displayText: "Give your name", 
        source: "agent"
      });
    }
    if (!req.body.result.parameters.email) {
      return res.json({
        speech: "Give your email Id",
        displayText: "Give your email Id", 
        source: "agent"
      });
    }
  }
    if (req.body.result.metadata.intentName == "Create IdCard - custom") {
      if (!req.body.result.parameters.email) {
        return res.json({
          speech: "Give your email Id",
          displayText: "Give your email Id", 
          source: "agent"
        });
      } else if (!req.body.result.parameters.number) {
        return res.json({
          speech: "Give your number",
          displayText: "Give your number", 
          source: "agent"
        });
      } else if (!req.body.result.parameters.Designation) {
        return res.json({
        speech: "Give your Designation" ,
        displayText: "Give your Designation" , 
        source: "agent"
        });
      } else {
        return res.json({
          

          "speech": "Id Card request Submitted successfully !!",
          "displayText": "Requested updated",

          "data":{
              "google": {
                  "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                          {
                              "simpleResponse" : {
                                "textToSpeech": "Id card request submitted!!"
                              }
                          },
                          {
                            "basicCard": {
                              "title": "Identity Card",
                              "formattedText": "**Name** : " + req.body.contexts.parameters.any + " \n**Phone Number** : " + req.body.result.parameters.number + " \n**Email ID** : " + req.body.result.parameters.email + " \n**Designation** : " + req.body.result.parameters.Designation,
                              "buttons": []
                            }
                          }
                      ]
                  }
                 
              }

          },
          "contextOut": [
              {
                "name": "_actions_on_google",
                "lifespan": 99,
                "parameters": {
                  "data": "{}"
                }
              }
            ]
          });
        }
      }
      requestCard.push(req.body.result.parameters.any, req.body.result.parameters.email,
        req.body.result.parameters.number, req.body.result.parameters.Designation);
      app.get('/demo',function (req,res ) {
      if(req.body.result.metadata.intentName == "ViewRequests") {
        for (var i in requestCard) {
          console.log(i);
          return res.send(i);
        }
      }
     });
  });
      