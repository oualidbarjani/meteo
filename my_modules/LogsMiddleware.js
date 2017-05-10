// ********************************************************
//
// Logs Middleware. Every message receive or sent is 
// logged in a Mongo collection
//
// ********************************************************

var config  = require('../config.js');
var mongojs = require('mongojs');

var mongo = mongojs(config.db.mongo.base, config.db.mongo.tables);

const LogsMiddleware = {}

LogsMiddleware.receive = function(message, next){
    var userId = message.address.user.id;
    var message = {
        from: 'user',
        text: message.text,
        attachments:  message.attachments,
        timestamp: new Date().getTime()
    }
    mongo.interactions.find({user_id: userId}, function (err, docs) {
        if(docs.length == 0){
            mongo.interactions.save({user_id: userId, interactions: []});
        }
        mongo.interactions.update({user_id: userId}, {$push: {interactions: [message]}}, function () {
            next()
        });
    })
}

LogsMiddleware.send = function(message, next){
    // Filtering "typing" message, not to send them.
    if(message.type == 'typing'){
        next();
    }else{
        var userId = message.address.user.id;
        console.log("Sending : ")
        console.log(message)
        var message = {
            from: 'bot',
            text: message.text,
            attachmentLayout:  message.attachmentLayout,
            attachments:  message.attachments,
            timestamp: new Date().getTime()
        }
        mongo.interactions.update({user_id: userId}, {$push: {interactions: [message]}}, function () {
            next()
        });
    }
}

module.exports = LogsMiddleware
