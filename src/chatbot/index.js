const request = require("request");

function reply(replyToken, message) {
    request.post(
        {
            url: process.env.LINE_REPLY_URL,
            headers: {
                'Authorization': `Bearer ${process.env.CHATBOT_TOKEN}`
            },
            json: {
                "replyToken": replyToken,
                "messages": [
                    {
                        "type": "text",
                        "text": message
                    }
                ]
            }
        }, (error, response, body) => {
            // console.log(body)
        }
    );

    console.log("[reply]")
    console.log(message)
};

function push(userId, message) {
    request.post(
        {
            url: process.env.LINE_PUSH_URL,
            headers: {
                'Authorization': `Bearer ${process.env.CHATBOT_TOKEN}`
            },
            json: {
                "to": userId,
                "messages": [
                    {
                        "type": "text",
                        "text": message
                    }
                ]
            }
        }, (error, response, body) => {
            // console.log(body)
        }
    );

    console.log("[push]")
    console.log(message)
};
module.exports = {
    reply,
    push,
}