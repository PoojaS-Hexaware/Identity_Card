var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var requestCard = [];



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
      req.body.result.contexts.forEach(function(context){
          if(context.name == 'createidcard-followup'){
            RequestedName = context.parameters.any;
          }  
      })
      var id = {
        'name'  : RequestedName,
        'email' : req.body.result.parameters.email,
        'number' : req.body.result.parameters.number,
        'designation' : req.body.result.parameters.Designation,
      }
      requestCard.push(id);
      console.log(id);
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
                              "formattedText": "**Name** : " + id.name +
                                " \n**Phone Number** : " + id.number +
                                " \n**Email ID** : " + id.email +
                                " \n**Designation** : " + id.designation,
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
  if(req.body.result.metadata.intentName == "ViewRequests") {
    //var requestCards = JSONObject.requestCard;
    //for (var i in requestCard) {
    if (requestCard.length == 0) {
      return res.json({
        speech : "No Id card request submitted !!",
        displayText : "No id card request",
        source : "agent"
      });
    } else if (requestCard.length == 1) {
      req.body.result.contexts.forEach(function(context){
        if(context.name == 'createidcard-followup'){
          RequestedName = context.parameters.any;
          Email = context.parameters.email;
          Num = context.parameters.number;
          Desg = context.parameters.Designation;
        }  
      })
      var id = {
      'name'  : RequestedName,
      'email' : Email,
      'number' : Num,
      'designation' : Desg,
      }
      requestCard.push(id);
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
                              "formattedText": "**Name** : " + id.name +
                                " \n**Phone Number** : " + id.number +
                                " \n**Email ID** : " + id.email +
                                " \n**Designation** : " + id.designation,
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
    } else {
      for (var i = 0; i < requestCard.length; i++) {     
        var itemValues = [];
        //item.push(requestCard[i]);
        itemValues.push({
          "optionInfo": {
              "key": "PhoneNumber :"  + requestCard[i].number,
              "synonyms": [
                  "View Card",
                  "All card requested",
                  "View list of card requested"
              ]
          },
          "title": "Submitted request of :" + requestCard[i].name,
          "description": "Designation : " + requestCard[i].designation,
        })
      }
      return res.json ({
          "conversationToken": "",
          "expectUserResponse": true,
          "expectedInputs": [
              {
                  "inputPrompt": {
                      "initialPrompts": [
                          {
                              "textToSpeech": "Here are list of Id Card request Submitted !!" +
                                "\n Choose any one to view detailed information."
                          }
                      ],
                      "noInputPrompts": []
                  },
                  "possibleIntents": [
                      {
                          "intent": "actions.intent.OPTION",
                          "inputValueData": {
                              "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                              "listSelect": {
                                  "title": "List of all Id Card Requested",
                                  "items": itemValues
                              }
                          }
                      }
                  ]
              }
          ]
      });
    }
  }
});
      