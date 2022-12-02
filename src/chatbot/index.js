const request = require("request");
const callRequest = require("../bus/request")
const { stationIdBusList } = require("../bus/routeidmap")
const GetStationID = require("../bus/getid.js")
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