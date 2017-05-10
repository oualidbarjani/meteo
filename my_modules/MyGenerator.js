// ********************************************************
//
// A little piece of code to Generate some templates for
// the bot (facebook ones, and others) 
// 
// ********************************************************

var config          = require('../config.js');
var texts           = require('../texts.js');
var tools           = require('../tools.js');
var builder         = require('botbuilder');

const MyGenerator = {}


MyGenerator.carouselProductMessage = function (session, builder, products, allSame){
    var attachments = []

    for(var p in products){
        var product = products[p];
        if (p == 0 && allSame == undefined){
            var btns = [
                    builder.CardAction.openUrl(session, product.product_url, texts.usecase_product_scan.button_usecase_payment),
                    builder.CardAction.imBack(session, "usecase_main_menu", texts.global.main_menu)
                ]
        }else{
            var btns = [
                    builder.CardAction.openUrl(session, product.product_url, texts.usecase_product_scan.button_usecase_payment),
                    builder.CardAction.imBack(session, "more:"+product.product_ean, texts.usecase_product_scan.button_more_info)
                ]
        }
        attachments.push(
            new builder.HeroCard(session)
                .title(product.product_brand + " - "+ product.product_name + " "+ product.product_price + "€")
                .subtitle(texts.usecase_product_scan.card_title_mark+" "+ tools.rating(product.product_rating) + "\n\r"+product.product_short_description)
                .images([
                    builder.CardImage.create(session, product.product_picture),
                ])
                .buttons(btns)
            )
    }

    var msg = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachments);
        return msg
}



// Generatubg List message
MyGenerator.listMessage = function (type, elements){
    var elts = [];
    elts.push(
        {
            "title": texts.usecase_user_diagnostic[type].diagnostic_ritual.title,
            "image_url": texts.usecase_user_diagnostic[type].diagnostic_ritual.picture,
            "subtitle": texts.usecase_user_diagnostic[type].diagnostic_ritual.description,
            "buttons": [
                {
                    "type": "postback",
                    "title": texts.usecase_user_diagnostic.discover_result,
                    "payload":"diagnostic_discover_result"
                }
            ]
        }
    )

    for (var e in elements){
        el = elements[e];
        var elt = {
                "title": el.product_brand + " - "+ el.product_name + " - "+ el.product_price + "€",
                "image_url": el.product_picture,
                "subtitle": texts.usecase_product_scan.card_title_mark+" "+ tools.rating(el.product_rating)+"\n"+
                    el.product_short_description,
                "default_action": {
                    "type": "web_url",
                    "url": el.product_url,
                },
                "buttons": [
                    {
                        "title": texts.usecase_product_scan.button_usecase_payment,
                        "type": "web_url",
                        "url": el.product_url,
                    }
                ]
            }
        elts.push(elt);
    }
    var msg = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "elements": elts,
                 "buttons": [
                    {
                        "title": texts.usecase_user_diagnostic.discover_result,
                        "type": "postback",
                        "payload": "diagnostic_discover_result"
                    }
                ]
            }
        }
    }
    return msg;
}

MyGenerator.previewVariablesDiagnosticFace = function (user){
    var txt = "";
    if(user.user_age != undefined){
        txt = txt+"Age: "+tools.getDisplayNameFromDB(texts.usecase_user_diagnostic["age"].choices, user.user_age, "user_age")+" ";
    }
    if(user.user_skin_type != undefined){
        txt = txt+"Peau: "+tools.getDisplayNameFromDB(texts.usecase_user_diagnostic["face"]["skin_type"].choices, user.user_skin_type, "user_skin_type")+" ";
    }
    if(user.user_environment != undefined){
        txt = txt+"Environment: "+tools.getDisplayNameFromDB(texts.usecase_user_diagnostic["face"]["environment"].choices, user.user_environment, "user_environment")+" ";
    }

    if(user.user_status != undefined){
        txt = txt+"Status: "+tools.getDisplayNameFromDB(texts.usecase_user_diagnostic["face"]["status"].choices, user.user_status,"user_status")+" ";
    }

    if(user.user_lifestyle != undefined){
        txt = txt+"Lifestyle: "+tools.getDisplayNameFromDB(texts.usecase_user_diagnostic["face"]["lifestyle"].choices, user.user_lifestyle, "user_lifestyle")+" ";
    }
    return txt;
}

module.exports = MyGenerator
