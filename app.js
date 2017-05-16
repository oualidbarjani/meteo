var request = require('request');
var restify = require('restify');
var builder = require('botbuilder');
//var fbTemplate = require('claudia-bot-builder').fbTemplate;

//---------------------------------------------------------
// Configuration
//---------------------------------------------------------

// Connector
var connectorAppId = '26000033-241d-4c14-8746-8faa36601312';
var connectorAppPassword = '26HiFG1QCVEsNZZc7BoxST8';


// Open Weather Map
var openWeatherMapAppId = 'd0c4e9ad435b3a5a337d72ccadab70ce';


//---------------------------------------------------------
// Setup
//---------------------------------------------------------

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create connector and bot

var connector = new builder.ChatConnector({
    appId: connectorAppId,
    appPassword: connectorAppPassword
});

var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());

// Create the intent recognizer

var dialog = new builder.IntentDialog();
bot.dialog('/', dialog);

//---------------------------------------------------------
// Dialogs
//---------------------------------------------------------
 
dialog.matches(/^bonjour/i, [
        function (session) {
            builder.Prompts.text(session, 'De quelle ville voulez-vous connaître la météo  ?');
            
        },
        

        function (session, results) { 

         var video = [];

         video.push(new builder.VideoCard(session)
        .image(builder.CardImage.create(session, 'https://parabotstorage.blob.core.windows.net/parabot-pictures/Decouvrirlisa.png'))
        .media([
            { url: 'https://parabotstorage.blob.core.windows.net/parabot-pictures/Demo.mp4' }
        ])
         ) 
        var msg = new builder.Message(session)
                             .attachments(video);
                         session.send(msg);   
 var attachments = [];
 attachments.push(new builder.HeroCard(session)                       
                        .subtitle( "nettoyer, booster, raffermir")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/Fermet%C3%A9%40720p.png"),
                        ])                      
                    );
 attachments.push(new builder.HeroCard(session)                       
                        .subtitle( "purifier, dynamiser, hydrater")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/%C3%89clat%40720p.png"),
                        ])                       
                    );
 attachments.push(new builder.HeroCard(session)                       
                        .subtitle("nettoyer, corriger, proteger")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/Rides%40720p.png"),
                        ])                      
                    );
 attachments.push(new builder.HeroCard(session)                       
                        .subtitle("nettoyer, traiter, proteger")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/T%C3%A2ches%40720p.png"),
                        ])                       
                    );
 attachments.push(new builder.HeroCard(session)                       
                        .subtitle("nettoyer, resserer, hydrater")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/Brillance%40720p.png"),
                        ])                       
                    );
 attachments.push(new builder.HeroCard(session)                      
                        .subtitle("purifier, resserer, traiter")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/Acn%C3%A9%40720p.png"),
                        ])                      
                    );
 attachments.push(new builder.HeroCard(session) 
                        .subtitle("nettoyer, apaiser, nourrir")
                        .images([
                            builder.CardImage.create(session, "https://parabotstorage.blob.core.windows.net/parabot-pictures/Rougeurs%40720p.png"),
                        ])                       
                    );  
 var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(attachments);
session.send(msg); 


  
      
            openweathermap(results.response, function(success, previsions) {
                if (!success) return session.send('Une erreur s\'est produite, veuillez réessayer.');
                
                var message = 'Voici la météo pour :' + results.response + ' :\n\n' +
                              '_ Température : ' + previsions.temperature + '°C\n\n' + 
                              '_ Humidité : ' + previsions.humidity + '%\n\n' +
                              '_ Vent : ' + previsions.wind + 'km/h';
                              
                session.send(message);
            });
        }
]);

dialog.onDefault(function (session) {
    session.send('bonjour ! ');
    

});

//---------------------------------------------------------
// Open Weather Map
//---------------------------------------------------------

var openweathermap = function(city, callback){
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=fr&units=metric&appid=' + openWeatherMapAppId;
    
    request(url, function(err, response, body){
        try{        
            var result = JSON.parse(body);
            
            if (result.cod != 200) {
                callback(false);
            } else {
                var previsions = {
                    temperature : Math.round(result.main.temp),
                    humidity : result.main.humidity,
                    wind: Math.round(result.wind.speed * 3.6),
                    city : result.name,
                };
                        
                callback(true, previsions);
            }
        } catch(e) {
            callback(false); 
        }
    });
}