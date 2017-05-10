// ********************************************************
//
// A little piece of code to Generate some templates for
// the bot (facebook ones, and others) 
// 
// ********************************************************

var config          = require('../config.js');
var request         = require('request');

const Tools = {}

Tools.sendMessageToUsers = function (msg, users, timeout){
	setTimeout(function() {
	    for(var u in users){
	        var user = users[u];
		    requestData = {
			  "recipient":{
			    "id": user.id
			  },
			  "message": msg
			}
		    request({
		        url: "https://graph.facebook.com/v2.6/me/messages?access_token="+config.pageAccessToken,
		        method: "POST",
		        json: requestData
		    }, function(error, response, body){
	        	console.log("Message sent to "+user.name);
	        	console.log(body);
		    });
	    }
	}, timeout);
}

module.exports = Tools
