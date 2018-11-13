//var express = require('express');
var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
global.requestCard = [ {
          "name" : null,
          "email": null,
          "number": null,
          "designation": null            
}]
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
    requestCard[name].push(req.body.result.parameters.any);
    //console.log(" the name - " +requestCard.idRequest.name);
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
      }     
      requestCard[email].push(req.body.result.parameters.email);
      //console.log(" the email - " +requestCard.email);
            
      requestCard[number].push(req.body.result.parameters.number);
      //console.log(" the phone number - " +requestCard.number);

      requestCard[designation].push(req.body.result.parameters.Designation);
      //console.log(" the designation - " +requestCard.designation);
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
                              "formattedText": "**Name** : " + requestCard[name] + 
                              " \n**Phone Number** : " + requestCard[number] + 
                              " \n**Email ID** : " + requestCard[email] + 
                              " \n**Designation** : " + requestCard[designation]
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
    if(req.body.result.metadata.intentName == "ViewRequests") {
      var requestCards = JSONObject.requestCard;
      for (var i = 0; i < requestCards.length; i++) {
          return res.json({
              
            "speech": "View Submitted Id card",
            "displayText": "View Submitted Id card",
            "data":{
                "google": {
                    "expectedUserResponse":true,
                    "richResponse" : {
                        "items" : [
                            {
                                "simpleResponse" : {
                                    "textToSpeech": "Submitted ID Card Request are :"
                                }
                            },
                            {
                              "basicCard": {
                                "title": "Identity Card",
                                "formattedText": "**Name** : " + requestCards[i].name + 
                                " \n**Phone Number** : " + requestCards[i].number + 
                                " \n**Email ID** : " + requestCards[i].email + 
                                " \n**Designation** : " + requestCards[i].designation
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
  });
      