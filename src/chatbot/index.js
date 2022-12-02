const request = require("request");
const callRequest = require("../bus/request")
let userState = {};
async function makeMessage(replyToken, message) {
    if (message === '버스') {
        return await callRequest();
    } else if (message == '9' || message == '7000' || message == '5100' || message == '1112') {
        return await callRequest(message);
    } else {
        return "명령어를 다시 입력하세요."
    }
}
function recvMessage(replyToken, messsage) {
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