const request = require("request");
const callRequest = require("../bus/request")
const { stationIdBusList } = require("../bus/routeidmap")
const GetStationID = require("../bus/getID.js")
let userState = {};


async function makeMessage(replyToken, stationId, message) {
    if (message === '전체') {
        return await callRequest(stationId);
    } 

    if (stationIdBusList[stationId].includes(String(message))) {
        return await callRequest(stationId, message);
    } else {
        return "명령어를 다시 입력하세요."
    }
    
}
function recvMessage(replyToken, message) {
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
    push,
    makeMessage,
    recvMessage
}