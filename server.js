var express = require('express');
var bodyParser = require('body-parser');
var test_url = 'https://isg-poc.herokuapp.com/REQUESTSTATUS';
var port = process.env.PORT || 3000;
var http = require('http');
var request = require('request');
var app = express();
var requestCard = [] 




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});
app.listen(port, function () {
 console.log(`Example app listening on port !`);
});


app.get("/getfile/:data",function(req,res){
	       
	         res.sendFile(__dirname+"/"+req.params.data)}
	});
	



app.post("/demo", function(req, res) {
  console.log(JSON.stringify(req.body));
  if (req.body.result.metadata.intentName == "CreateIdCard")
  {
    if (!req.body.result.parameters.any) {
      return res.json({
        speech: "Ok! So tell me your name?",
        displayText: "Ok! So tell me your name?", 
        source: "agent"
      });
    } 
  }
  if (req.body.result.metadata.intentName == "IdCardInfo") {    
    if (!req.body.result.parameters.email) {
      return res.json({
        speech: "Tell me your email Id",
        displayText: "Tell me your email Id", 
        source: "agent"
      });
    } else if (!req.body.result.parameters.number) 
    {
      return res.json({
        speech: "Please tell your Phone Number",
        displayText: "Please tell your Phone Number", 
        source: "agent"
      });
    } else if (!req.body.result.parameters.Designation) {
      return res.json({
        "speech": "And your Designation is ?",
        "displayText": "And your Designation is ?",

        "data": {
            "google": {
              "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "And your Designation is?" 
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
      var id_number = Math.floor(Math.random() * (99999 - 10000 + 1) ) + 10000; 
      var id = {
        'name'  : req.body.result.parameters.any,
        'email' : req.body.result.parameters.email,
        'number' : req.body.result.parameters.number,
        'designation' : req.body.result.parameters.Designation,
        'id_number' : id_number
      }
      requestCard.push(id);
      return res.json({

          
        "speech": "OK " + id.name + ", Your ID card request is Submitted Succesfully!!",
        "displayText": "Requested updated",

        "data": {
            "google": {
              "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "OK " + id.name + ", Your ID card request is Submitted Succesfully!!"
                            }
                        },
                        {
                          "basicCard": {
                              "title": "Submitted ID Card",
                              "formattedText": "**Request Number** : "+ id.id_number +"  \n" +
                              "**Name** : "+ id.name +"  \n" +
                              "**Phone Number** : "+ id.number +"  \n" +
                              "**Email ID** : "+ id.email +"  \n" +
                              "**Designation** : "+ id.designation,
                              "buttons" : []
                          }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "Create ID Card"
                        },
                        {
                            "title": "View Request"
                        },
                        {
                          "title" : "Exit"
                        }
                      ]
                    }
                  }
                },                 
        "contextOut": [
          {
            "name": "_actions_on_google",
            "lifespan": 2,
            "parameters": {
            "data": "{}"
            }
          }
        ]
      });
    }
  }
if(req.body.result.metadata.intentName == "ViewRequests") {
    if (requestCard.length == 0) {
      return res.json({
        "speech": "Sorry, No request Submitted !!",
        "displayText": "Sorry, No request Submitted",

        "data": {
            "google": {
              "expectedUserResponse":true,
              "richResponse" : 
                {
                  
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "Sorry No Request Submitted !!" 
                            }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "Create ID Card"
                        },
                        {
                            "title": "Exit"
                        }
                      ]
                  
                }
            }
          }
      });
    } else if (requestCard.length == 1) {
      return res.json({
        "speech": "Following is the only ID Card Submitted till Date",
        "displayText": "Only one Id Card Requested",

        "data": {
            "google": {
              "expectedUserResponse":true,
                  "richResponse" : {
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "Following is the only ID Card Submitted till Date :"
                            }
                        },
                        {
                          "basicCard": {
                              "title": "Identity Card",
                              "formattedText": "**Request Number** : " + requestCard[0].id_number + "  \n" +
                                "**Name** : " + requestCard[0].name + "  \n" +
                                "**Phone Number** : " + requestCard[0].number +"  \n" +
                                "**Email ID** : " + requestCard[0].email + "  \n" +
                                "**Designation** : " + requestCard[0].designation,
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
            "lifespan": 2,
            "parameters": {
            "data": "{}"
            }
          }
        ]
      });
    } else {
      var itemValues = []
      for (var i = 0; i < requestCard.length; i++) {     
        itemValues.push({
          "optionInfo": {
              "key": i.toString(),
              "synonyms": [
                  "request number",
                   i.toString()
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
                      "textToSpeech": "Following are the list of Id Card request submitted!!" + "  \n" 
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
                    "title": "List of all the Id Card Requested !!",
                    "items": itemValues
                  }
                }
              }
            }
          }
        });
      }
    } else if(req.body.result.metadata.intentName == 'ViewSelectedRequests') { 
      var keySelected = req.body.result.parameters.requestnumber;
      return res.json({
        "speech": "Below is Detailed information of ID Card submitted by " 
        + requestCard[keySelected].name,
        "displayText": "Below is Detailed information of ID Card submitted",
        "data": {
          "google": {
            "expectedUserResponse":true,
            "richResponse" : {
              "items" : [
                {
                  "simpleResponse" : {
                  "textToSpeech": "Below mentioned is the detailed information of ID Card Requested by " 
                  + requestCard[keySelected].name 
                }
              },
              {
                "basicCard": {
                  "title": "Identity Card",
                  "subtitle": " Request Number : " + requestCard[keySelected].id_number + "  \n",
                  "formattedText": "**Name** : " + requestCard[keySelected].name + "  \n" +
                  "**Phone Number** : " + requestCard[keySelected].number +"  \n" +
                  "**Email ID** : " + requestCard[keySelected].email + "  \n" +
                  "**Designation** : " + requestCard[keySelected].designation,
                }
              },
            ],
            "suggestions": [
              {
                "title": "Create ID Card"
              },
              {
                "title": "View Status"
              },
              {
                "title": "Exit"
              }
            ]
          }
        }
      }
    });
  } else if (req.body.result.metadata.intentName == "ViewStatus") {
    var view_status = [];
    var pending_count = 0;
    var dispatched_count = 0;
    var closed_count = 0;
    request.post(test_url, { json: true }, (err, response, body) => {
      array_length = (body['ID CARD REQUESTS'].CARD_REQUESTS).length;
      if(!err) {
        for (var i=0; i < array_length; i++) {
          if(body['ID CARD REQUESTS'].CARD_REQUESTS[i].STATUS == "Pending") {
            pending_count++;
          } else if(body['ID CARD REQUESTS'].CARD_REQUESTS[i].STATUS == "Dispatched") {
            dispatched_count++;
          } else {
            closed_count++;
          }
          view_status.push({
            "optionInfo": {
                "key": i.toString(),
                "synonyms": [
                    "request number",
                     i.toString()
                ]
            },
            "title": "ID Card of :" + body['ID CARD REQUESTS'].CARD_REQUESTS[i].NAME,
            "description": "Designation : " +body['ID CARD REQUESTS'].CARD_REQUESTS[i].DESIGNATION + "  \n"
            + "Current Status : " + body['ID CARD REQUESTS'].CARD_REQUESTS[i].STATUS,
          });
      }
      return res.json({
        "speech": "Status of Id Card Requested",
        "displayText": "Status of Id Card Requested",
        "data": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "ssml": "<s>" + "Following are the Status of Id Card requested!!" + "</s>" +"<s>"+ "Total Request :" + "</s>" +array_length 
                      + "  \n" + "<s>"+ "Pending :"+ "</s>" +pending_count + "<s>"+ ", Request Dispatched : "+ "</s>" + dispatched_count + "  \n" + "<s>" + "And about" +"</s>" +closed_count + " closed." 
                    }
                  }
                ],
                "suggestions": [
                  {
                    "title": "Create ID Card"
                  },
                  {
                    "title": "View Requests"
                  },
                  {
                    "title": "Exit"
                  }
                ]
              },
              "systemIntent": {
                "intent": "actions.intent.OPTION",
                "data": {
                  "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec",
                  "listSelect": {
                    "title": "Status of all the Id Card Requested !!",
                    "items": view_status
                  }
                }
              }
            }
          }
        });
      }
    });
  } else if(req.body.result.metadata.intentName == 'ViewSingleStatus') { 
    console.log("id in follow up"+ JSON.stringify (req.body.result));
    var key = req.body.result.parameters.key;
    console.log("Type of identity Number is " +typeof key);
    request.post(test_url, { json: true }, (err, response, body) => {
      if(!err) {
        return res.json({
          "speech": "Your ID's Staus is",
        "displayText": "Your ID's Staus is",

        "data": {
            "google": {
              "expectedUserResponse":true,
              "richResponse" : 
                {
                  
                      "items" : [
                        {
                          "simpleResponse" : {
                              "textToSpeech": "Ms/Mrs/Mr. " +body['ID CARD REQUESTS'].CARD_REQUESTS[key].NAME+ " your ID's, current Status is: "
                              +body['ID CARD REQUESTS'].CARD_REQUESTS[key].STATUS 
                            }
                        }
                      ],
                      "suggestions": [
                        {
                            "title": "Create ID Card"
                        },
                        {
                          "title": "View Requests"
                        },
                        {
                            "title": "Exit"
                        }
                      ]
                  
                }
            }
          }
        })
      }
    })
  }
})
