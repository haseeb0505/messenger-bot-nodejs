const request = require('request');
module.exports = function sendMessage(recipientId, message) {
    let PAGE_ACCESS_TOKEN = "EAAM9smHm8ZAgBADxaffRctCHS5ZAlYdO1XfoymUm4IpPOwb5EoLc0WTbOhbDYi4yiFN16x3IxWLZBMK8hhrxpHVUH2ZCTZBcsuJRdW4C3jHH54iQPhiAQKfQz67je7CkhkoR5oPuVE1ZCqTvtC5mW22mgqLJJOWzTRIuSDrufmCQ86dNVgbr1WITe3jURpV59FBTbzuWQtWwZDZD"

    return new Promise(function (resolve, reject) {
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: { access_token: `${PAGE_ACCESS_TOKEN}` },
            method: "POST",
            json: {
                recipient: { id: recipientId },
                message: message,
            }
        }, function (error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}