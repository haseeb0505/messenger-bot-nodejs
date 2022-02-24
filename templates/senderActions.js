const request = require('request');
module.exports = function senderActions(recipientId) {
    let PAGE_ACCESS_TOKEN = "EAAM9smHm8ZAgBADxaffRctCHS5ZAlYdO1XfoymUm4IpPOwb5EoLc0WTbOhbDYi4yiFN16x3IxWLZBMK8hhrxpHVUH2ZCTZBcsuJRdW4C3jHH54iQPhiAQKfQz67je7CkhkoR5oPuVE1ZCqTvtC5mW22mgqLJJOWzTRIuSDrufmCQ86dNVgbr1WITe3jURpV59FBTbzuWQtWwZDZD"
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: `${PAGE_ACCESS_TOKEN}` },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            "sender_action": "typing_on",
        }
    }, function (error, response, body) {
        if (error) {

            console.log("Error haseeb");


        }
    });
}