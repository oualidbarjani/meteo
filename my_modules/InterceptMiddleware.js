// ********************************************************
//
// Intercept Middleware. Check if a message have to
// interupt the flow:
// Could interrupt
//  - if it's a buton payload
//  - if it trig a LUIS Intent
// Couldn't interrupt
//  - if it's a quickreply
//  - if it's LUIS's None Intent
// ********************************************************

var config          = require('../config.js');
var builder         = require('botbuilder');
var tools           = require('../tools.js');

const InterceptMiddleware = {}


InterceptMiddleware.botbuilder = function(session, next){
    if(session.message.sourceEvent.postback){
        console.log("Interupted: Button")
        session.endConversation();
        next();
    }else if(session.message.sourceEvent.message && session.message.sourceEvent.message.quick_reply){
        console.log("Not interrupted: Quickreply.")
        next();
    }else if(session.message.attachments.length > 0){
        console.log("Not interrupted: attachment.");
        next();
    }else{
        builder.LuisRecognizer.recognize(session.message.text, config.luisModelUrl, function(err, intents, entities){
            tools.incrementLUISStat()
            tools.incrementLUISStat()
            console.log(intents);
            if (err) throw err;
            if(intents[0].intent == "None"){
                console.log("Not interrupted: None intent")
                next();
            }else{
                console.log("Interupted: New intent")
                session.endConversation();
                next();
            }
        })
    }
}

module.exports = InterceptMiddleware
