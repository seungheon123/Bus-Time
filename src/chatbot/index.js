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
            url: process.env.LINE_TARGET_URL,
            headers: {
                'Authorization': `Bearer ${process.env.CHATBOT_TOKEN}`
            },
            json: {
                "replyToken": replyToken,
                "messages": [
                    {
                        "type": "text",
                        "text": messsage
                    }
                ]
            }
        }, (error, response, body) => {
            // console.log(body)
        }
    );
};
module.exports = {
    recvMessage,
    makeMessage,
}