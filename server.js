//var express = require('express');
var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
global.requestCard ={
    
  "idRequest": 
      {
          "name":[],
          "email":[],
          "number":[],
          "designation":[]          
      }   
};
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
    requestCard.idRequest.name.push(req.body.result.parameters.any);
    console.log(" the name - " +requestCard.idRequest.name);
    if (!req.body.result.parameters.email) {
      return res.json({
        speech: "Give your email Id",
        displayText: "Give your email Id", 
        source: "agent"
      });
    }
    requestCard.idRequest.email.push(req.body.result.parameters.email);
    console.log(" the email - " +requestCard.idRequest.email);
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
      }     
          
        requestCard.idRequest.number.push(req.body.result.parameters.number);
        console.log(" the phone number - " +requestCard.idRequest.number);

        requestCard.idRequest.designation.push(req.body.result.parameters.designation);
        console.log(" the designation - " +requestCard.idRequest.designation);
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
                              "formattedText": "**Name** : " + requestCard.idRequest.name[requestCard.idRequest.name.length - 1] + 
                              " \n**Phone Number** : " + requestCard.idRequest.number[requestCard.idRequest.number.length - 1] + 
                              " \n**Email ID** : " + requestCard.idRequest.email[requestCard.idRequest.email.length - 1] + 
                              " \n**Designation** : " + requestCard.idRequest.designation[requestCard.idRequest.designation.length - 1],
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
      
      /*requestCard.push([req.body.result.parameters.any, req.body.result.parameters.email,
        req.body.result.parameters.number, req.body.result.parameters.Designation]);*/
      if(req.body.result.metadata.intentName == "ViewRequests") {
        requestCard.id.forEach(function(i) {
          return res.json({
            speech: i,
            displayText: i,
            source: "agent"
          });
        });
      }
  });
      