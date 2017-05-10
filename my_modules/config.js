// ********************************************************
//
// Configuration file, with all the vars, tokens, ids
// used by the app.
//
// ********************************************************

const config = {
    // Global vars
    port: 8080,
    endpoint: '/api/messages',

    smtpConf: 'smtps://antoine%40vadot.me:ob34782j@ssl0.ovh.net',
    mailSender: "dev@webotit.com",

    // DBs Informations
    db: {
        sql: {
          connectionLimit : 100,
          host            : 'localhost',
          user            : 'maibot',
          password        : 'pLTJasyN2VDZUFWR',
          database        : 'maibot'
        },
        db_products:        'db_products1',
        mongo: {
            base: 'maibot',
            tables: ['contents', 'users'],
        }
    },



    // Botframework
    appId: 'ef8d4319-7cd6-423e-85c4-991d3cbb72e2',
    appPassword: 'ZYe4u3cNMyNEnkUidXefoPy',

    // Facebook
    pageAccessToken: 'EAAQNGQ8hAgYBAIYKZCB0QUu3RsQG4UwpX84KVx4wJ6nbgKmQCm6EHTBsHUp8vNaWH677gyNBZA82VFiUe7Dor68oZBvhgoBDOnVxVfTUScCGAqReKJBtv9DW7qW0PJap7ucoSvrm7nGnX6QEIY9D0aUoWpECkkq3jJB7AO27AZDZD',

    // LUIS
    // My LUIS
    //luisModelUrl: 'https://api.projectoxford.ai/luis/v1/application?id=559879b9-ccc8-41c2-8f30-5e93e159aaf7&subscription-key=f0d7934ed99d45198f2bc21c3b5e661c',
    // WeBotIt Bugged
    //luisModelUrl: 'https://api.projectoxford.ai/luis/v1/application?id=764c64fc-cce0-4ce5-a56b-6164d76a7bb4&subscription-key=139251b01fc747d399647cf2ea19a19b',
    luisModelUrl: 'https://api.projectoxford.ai/luis/v1/application?id=8b8daa42-6d38-43ff-bf10-09c4f8f4a5a3&subscription-key=139251b01fc747d399647cf2ea19a19b',
    
    // BotMetrics
    botmetricsBotId: "6af692ded153",
    botMetricsApiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDksImV4cCI6MTc5NjU3Nzk2MX0.hJ8-ZV1w0Iq4yG7dGWz7vuH35yUN7qmwmIjVE1NJahI",
}

module.exports = config
