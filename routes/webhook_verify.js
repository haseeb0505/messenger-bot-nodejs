const processPostback = require('../processes/postback');
const processMessage = require('../processes/message');
module.exports = function (app, chalk) {
    app.get('/webhook', function (req, res) {
        if (req.query['hub.verify_token'] === "1q2w3e4r5t") {

            console.log('webhook verified');
            res.status(200).send(req.query['hub.challenge']);
        } else {

            console.error('verification failed. Token mismatch.');
            res.sendStatus(403);
        }
    });

    app.post('/webhook', function (req, res) {
        //checking for page subscription.
        if (req.body.object === 'page') {

            /* Iterate over each entry, there can be multiple entries 
            if callbacks are batched. */
            req.body.entry.forEach(function (entry) {

                // Iterate over each messaging event
                entry.messaging.forEach(function (event) {
                    console.log("event", event);
                    if (event.postback) {
                        processPostback(event);
                    } else if (event.message) {

                        // processMessage(event);
                        processPostback(event);

                    }
                });
            });
            res.sendStatus(200);
        }
    });
}