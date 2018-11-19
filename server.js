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
        "speech": "Give Your Designation",
        "displayText": "Give Your Designation",

        "data": {
            "google": {
              "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "Give your Designation" 
                            }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "Quality Analyst"
                        },
                        {
                            "title": "Software Developer"
                        },
                        {
                          "title": "Research and Developement"
                        },
                        {
                          "title": "Production"
                        },
                        {
                          "title": "Marketing"
                        },
                        {
                          "title": "Account and Finance"
                        }
                      ]
                    }
                  }
                }
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
                              "formattedText": "**Name** : "+ id.name +
                              "  \n" + "**Phone Number** : "+ id.number +
                              "  \n" + "**Email ID** : "+ id.email +
                              "  \n" + "**Designation** : "+ id.designation,
                              "buttons" : []
                          }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "create Id Card"
                        },
                        {
                            "title": "view submitted request"
                        },
                        {
                          "title" : "exit"
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
        "speech": "Sorry No request submitted !!",
        "displayText": "Sorry No request submitted",

        "data": {
            "google": {
              "expectedUserResponse":true,
              "richResponse" : 
                {
                  
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "Sorry No request submitted !!" 
                            }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "create Id Card"
                        },
                        {
                            "title": "exit"
                        }
                      ]
                  
                }
            }
          }
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
      'designation' : Desg
      }
      requestCard.push(id);
      return res.json({

        "speech": "Only one Id Card Requested !!",
        "displayText": "Only one Id Card Requested",

        "data": {
            "google": {
              "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "following is id card requested"
                            }
                        },
                        {
                          "basicCard": {
                              "title": "Identity Card",
                              "formattedText": "**Name** : " + id.name + "  \n" +
                                "**Phone Number** : " + id.number +"  \n" +
                                "**Email ID** : " + id.email + "  \n" +
                                "**Designation** : " + id.designation,
                              "buttons" : []
                          }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "create Id Card"
                        },
                        {
                            "title": "exit"
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
      var itemValues = []
      for (var i = 0; i < requestCard.length; i++) {     
        //item.push(requestCard[i]);
        itemValues.push({
          "optionInfo": {
              "key": requestCard[i].number,
              "synonyms": [
                  "phone number",
                  requestCard[i].number
              ]
          },
          "title": "Submitted request of :" + requestCard[i].name,
          "description": "Designation : " + requestCard[i].designation,
        })
      }
      return res.json({
        "speech": "List of Id Card Requested",
        "displayText": "List of Id Card Requested",
        "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "Following are the list of Id Card request submitted!! " 
                      + "Choose one for detailed information."
                    }
                  }
                ]
              },
              "systemIntent": {
                "intent": "actions.intent.OPTION",
                "data": {
                  "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                  "listSelect": {
                    "title": "List of all the Id Card Request Submitted",
                    "items": itemValues
                  }
                }
              }
            }
          }
        });
      }
    }
    if(req.body.result.metadata.intentName == 'ViewRequests - custom') {
      console.log("id in follow up"+ JSON.stringify (req.body.result));
      keySelected = req.body.result.parameters.number;
      console.log("Type of phoneNumber is " +typeof keySelected);
      req.body.result.contexts.forEach(function(context){
        if(context.name == '_actions_on_google'){
          selectedName = context.parameters.any;
          selectedEmail = context.parameters.email;
          selectedNum = context.parameters.number;
          selectedDesg = context.parameters.Designation;
        }  
      })
      var id = {
        'name'  : selectedName,
        'email' : selectedEmail,
        'number' : selectedNum,
        'designation' : selectedDesg
        }
      return res.json({
        "speech": "Information for selected id Card",
        "displayText": "Information for selected id Card",
        "data": {
          "google": {
            "expectedUserResponse":true,
            "richResponse" : {
              "items" : [
                {
                  "simpleResponse" : {
                  "textToSpeech": "Detailed information of selected id Card :"
                }
              },
              {
                "basicCard": {
                  "title": "Identity Card",
                  "formattedText": "**Name** : " + id.name + "  \n" +
                  "**Phone Number** : " + id.number +"  \n" +
                  "**Email ID** : " + id.email + "  \n" +
                  "**Designation** : " + id.designation,
                  "buttons" : []
                }
              }
            ],
            "suggestions": [
              {
                "title": "create Id Card"
              },
              {
                "title": "exit"
              }
            ]
          }
        }
      }
    });
  }    
});
