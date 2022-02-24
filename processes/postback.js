const request = require('request');
const senderAction = require('../templates/senderActions');
const sendMessage = require('../templates/senderMessage');
const { client } = require("../config/db");
const { ObjectId } = require("mongodb");



module.exports = function processPostback(event) {
    const senderID = event.sender.id;
    console.log("Received postback from senderId: " + senderID);
    // const payload = event.postback.payload;
    let PAGE_ACCESS_TOKEN = "EAAM9smHm8ZAgBADxaffRctCHS5ZAlYdO1XfoymUm4IpPOwb5EoLc0WTbOhbDYi4yiFN16x3IxWLZBMK8hhrxpHVUH2ZCTZBcsuJRdW4C3jHH54iQPhiAQKfQz67je7CkhkoR5oPuVE1ZCqTvtC5mW22mgqLJJOWzTRIuSDrufmCQ86dNVgbr1WITe3jURpV59FBTbzuWQtWwZDZD"



    // if (payload === 'WELCOME') {

    request({
        url: "https://graph.facebook.com/v2.6/" + senderID,
        qs: {
            access_token: PAGE_ACCESS_TOKEN,
            fields: "first_name"
        },
        method: "GET"
    }, function (error, response, body) {
        let greeting = '';
        if (error) {
            console.error("Error getting user name: " + error);
        } else {
            let bodyObject = JSON.parse(body);
            console.log(bodyObject);
            Name = bodyObject.first_name;
            greeting = "Hello " + Name + ". ";
        }


        var matches = event.message.text.match(/\d+/g);

        if (event.message.text.toLowerCase() === 'hi' || event.message.text.toLowerCase() === 'hello' || event.message.text.toLowerCase() === 'good morning' || event.message.text.toLowerCase() === 'good afternoon' || event.message.text.toLowerCase() === 'good evening') {
            senderAction(senderID);
            sendMessage(senderID, { text: greeting + 'How are you? ' }).then(() => {
                // senderAction(senderID);
                sendMessage(senderID, { text: 'I hope youre having a great day.' }).then(() => {
                    // senderAction(senderID);
                    sendMessage(senderID, { text: 'How can i help you ?' }).then(() => {
                        // sendMessage(senderID, { text:  })/
                    });
                });
            });
        }
        else if (matches !== null) {

            var txt = event.message.text.toLowerCase();
            var numb = txt.match(/\d/g);
            numb = numb.join("");


            productDetailfunction(senderID, numb);

        }
        else if (event.message.text.toLowerCase().includes('buy'.toLowerCase())) {
            senderAction(senderID);
            sendMessage(senderID, { text: 'Thank you for shopping with us. ' }).then(() => {
                sendMessage(senderID, { text: 'Your order has been placed. ' }).then(() => {
                    sendMessage(senderID, { text: 'We will deliver your order in 3-5 business days. ' }).then(() => {
                        sendMessage(senderID, { text: 'Have a great day.' }).then(() => {

                        });
                    });
                })

            })
        }
    });
}
// }
// arrow function syntax 
let productDetailfunction = async (senderID, numb) => {
    const db = await client.connect().then(() => {
        console.log('connected')
    });
    const collection = client.db("bot").collection("products");
    try {
        console.log(numb);

        let res = await collection.findOne({ sku: parseInt(numb) })
        console.log(res);
        if (res != null) {
            senderAction(senderID);
            sendMessage(senderID, { text: `Product Name: ${res.name}` }).then(() => {
                sendMessage(senderID, { text: ` Product Price: ${res.price}` }).then(() => {
                    sendMessage(senderID, { text: ` if you want to buy this Product.` }).then(() => {
                        sendMessage(senderID, { text: ` please reply with BUY .` }).then(() => {
                        })
                    })

                })

            });
        } else {
            sendMessage(senderID, { text: `Product not found.` }).then(() => {
                sendMessage(senderID, { text: `Please try again with Correct Product Id.` }).then(() => {
                })
            }

            )
        }
    } catch (error) {
        throw error;
    }






}
