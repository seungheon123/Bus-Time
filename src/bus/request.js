var request = require('request');
const convert = require("xml-js");
const { returnStationId } = require("../../app")
const { routeIdToBusNum } = require("./routeidmap");
// const { busNumToRouteId } = require("./routeidmap");

var url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList';

function callRequest(stationKey, message = "all") {
    return new Promise((resolve, reject) => {
        var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.SERVICE_KEY; /* Service Key*/
        queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent(stationKey); /* */

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            // console.log(stationKey)
            // console.log(convert.xml2js(body, { compact: true }).response)
            const data = convert.xml2js(body, { compact: true }).response;
            var rmessage = data.msgHeader.resultMessage._text;
            if (rmessage == '결과가 존재하지 않습니다.') {
                resolve("운행 중인 버스가 없습니다.");
                return;
            }
            else var arrivalList = data.msgBody.busArrivalList;

            let result = "";
            // if (message == "all") {
            //     for (let i in data) {
            //         result += `${data[i].routeId._text}번 버스 도착 정보입니다\n`;
            //         result += `첫 번째 도착: ${data[i].predictTime1._text}분\n`
            //         if (data[i].predictTime2._text)
            //             result += `두 번째 도착: ${data[i].predictTime2._text}분\n`;
            //         result += "\n";
                            

            //         console.log(data[i])


            //     }
            // } else {
            //     for (let i in data) {
            //         if (data[i].routeId._text == message) {
            //             result += `${routeIdToBusNum[data[i].routeId._text]}번 버스 도착 정보입니다\n`;
            //             result += `첫 번째 도착: ${data[i].predictTime1._text}분\n두 번째 도착: ${data[i].predictTime2._text}분\n\n`;
            //         }
            //     }
            // }
            for(let i in arrivalList){
                if(arrivalList[i].routeId._text == message){
                    //result += `${routeIdToBusNum[arrivalList[i].routeId._text]}번 버스 도착 정보입니다\n`;
                    result += `첫 번째 도착: ${arrivalList[i].predictTime1._text}분\n두 번째 도착: ${arrivalList[i].predictTime2._text}분\n\n`;
                }
            }

            resolve(result.substring(0, result.length - 2));
            // const data1 = convert.xml2js(body, { compact: true }).response.msgBody.busArrivalList[0].predictTime1._text
            // const data2 = convert.xml2js(body, { compact: true }).response.msgBody.busArrivalList[0].predictTime2._text
            // if (data1)
            // {
            //     //resolve(JSON.stringify(data.busArrivalList[0]));
            //     console.log("첫 번째: " + data1)
            //     resolve("첫 번째: " + data1 + "\n두 번째: "+data2);
            //     //resolve(JSON.stringify(data));
            // }
            // else
            //     resolve("운행 중인 버스가 없습니다.");
        });
    })
}

module.exports = callRequest
