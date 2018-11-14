var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
/*var requestCard = {}*/


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
    } else if (!req.body.result.parameters.email) {
      return res.json({
        speech: "Give your email Id",
        displayText: "Give your email Id", 
        source: "agent"
      });
    }
    //requestCard[0].push(req.body.result.parameters.any);
    //console.log(" the name - " +requestCard.idRequest.name);
    //requestCard[1].push(req.body.result.parameters.email);
      //console.log(" the email - " +requestCard.email);
            //requestCard[2].push(req.body.result.parameters.number);
      //console.log(" the phone number - " +requestCard.number);

      //requestCard[3].push(req.body.result.parameters.Designation);
      //console.log(" the designation - " +requestCard.designation);
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

        "data": {
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
                              "formattedText": "**Name** : " + req.body.contexts.any +
                                " \n**Phone Number** : " + req.body.result.parameters.number +
                                " \n**Email ID** : " + req.body.result.parameters.email +
                                " \n**Designation** : " + req.body.result.parameters.Designation,
                              "buttons" : []
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

/*
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
    }*/
});
      