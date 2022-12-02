/**
 * 
 * @param {string} text 정보를 추출할 문자열
 * @returns { { orderType: string, station: string, busId: number, alarmTiming: number}} alarmTiming은 분 단위
 */
function parseRequest(text) {
    list = text.split(' ');

    stationName = "외대"
    if( text === "버스") {
        result = { orderType:"printAll", station: stationName, busId: null,  alarmTiming: null }
    } else {
        result =  { orderType:"setAlarm", station: stationName, busId: Number(list[1]), alarmTiming: Number(list[2]) }
    }
    
    console.log("[parseRequest]");
    console.log(result);
    return result;
}

module.exports = {
    parseRequest
}