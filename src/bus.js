var request = require('request');
const convert = require("xml-js");
const { routeIdToBusNum } = require("./bus/routeidmap");

// https://www.data.go.kr/data/15080346/openapi.do?recommendDataYn=Y
var url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.SERVICE_KEY; /* Service Key*/
queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('228000710'); /* */

/**
 * 
 * @param {{orderType: string, station: string, busId: number, alarmTiming: number}} reqInfo 
 * @returns {[predictTime1: string, predictTime2: string]} 도착 예정인 2개의 버스에 대한 정보
 */
async function getBusInfo(reqInfo) {
    return new Promise((resolve, reject) => {
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const data = convert.xml2js(body, { compact: true }).response.msgBody.busArrivalList
            // TODO: 예외처리 보완해야함
            if(!data) resolve("운행 중인 버스가 없습니다.");

            let result = [];
            for (let i in data) {
                if(routeIdToBusNum[data[i].routeId._text] === reqInfo.busId) {
                    result.push(data[i].predictTime1._text);
                    result.push(data[i].predictTime2._text);
                    break
                }
            }

            console.log("[getBusInfo]")
            console.log(result)
            resolve(result);
        });

    })
}

/**
 * 모든 버스의 정보를 가져와서 문자열로 반환
 * 
 * @returns {Promise} Promise object represents message to reply
 */
function callRequest() {
    return new Promise((resolve, reject) => {
        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const data = convert.xml2js(body, { compact: true }).response.msgBody.busArrivalList
            if(!data) resolve("운행 중인 버스가 없습니다.");

            let result = "";
            for (let i in data) {
                result += `${routeIdToBusNum[data[i].routeId._text]}번 버스 도착 정보입니다\n`;
                result += `첫 번째 도착: ${data[i].predictTime1._text}\n두 번째 도착: ${data[i].predictTime2._text}\n\n`;
            }

            resolve(result.substring(0, result.length - 2));
        });
     })
}

module.exports = {
    getBusInfo,
    callRequest
};