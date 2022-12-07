const request = require("request");
const callRequest = require("../bus/request")
const { stationIdBusList } = require("../bus/routeidmap")
const GetStationID = require("../bus/getID.js")
let userState = {};


async function makeMessage(replyToken, stationId, message) {
    if (message === '전체') {
        return await callRequest(stationId);
    } 

   else{
    return await callRequest(stationId,message);
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

function confirm (replyToken,m1,m2) {
    request.post(
        {
            url: process.env.LINE_REPLY_URL,
            headers: {
                'Authorization': `Bearer ${process.env.CHATBOT_TOKEN}`
            },
            json: {
                "replyToken": replyToken,
                "messages" : [
                    {
                        "type": "text", // ①
                        "text": "중복된 정류소명이 존재합니다.",
                        "quickReply": { // ②
                          "items": [
                            {
                              "type": "action", // ③
                              "action": {
                                "type": "postback",
                                "label": m1,
                                "data" : "selectFirst"
                              }
                            },
                            {
                              "type": "action",
                              "action": {
                                "type": "postback",
                                "label": m2,
                                "data": "selectSecond"
                              }
                            }
                          ]
                        }   
                    }
                ] 
            } 
        }
    );
}
module.exports = {
    push,
    makeMessage,
    recvMessage,
    confirm
}