// const request = require('request');
const senderAction = require('../templates/senderActions');
const sendMessage = require('../templates/senderMessage');
module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            // now we will take the text received and send it to an food tracking API.
            let text = message.text;
            let request = require("request");
            let options = {
                method: 'POST',
                url: 'https://mefit-preprod.herokuapp.com/api/getnutritionvalue',
                headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                },
                body: {
                    userID: "4842049399227507",
                    searchTerm: text
                },
                json: true
            };
            senderAction(senderID);
            // sendGenericTemplate(senderID, body);
            // request(options, function (error, response, body) {
            //     if (error) {


            //     }
            //     else {
            //         throw new Error("this is the messagesss aerroror===>>>>", error);
            //     }// after the response is recieved we will send the details in a Generic template

            // });
        }
    }
}