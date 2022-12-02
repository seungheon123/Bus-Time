const { getBusInfo, callRequest } = require('./bus');

/**
 * @brief reqInfo을 받아서 버스가 reqInfo.alarmTiming분 후에 도착할 것으로 예상될 때 reqInfo를 가지는 Promise를 반환
 * 
 * @description 재귀함수를 이용해 버스가 충분히 올 때까지 기다림
 * 
 * @param {{orderType: string, station: string, busId: number, alarmTiming: number}} reqInfo 
 * @returns {Promise} info
 */
async function busArrivalAlarm(reqInfo) {
    return new Promise( async (resolve, reject) => {
        let busInfo = await getBusInfo(reqInfo)

        // 운행중인 버스가 없으면, null 반환
        if(busInfo[0] === undefined) {
            resolve(null);
        }
        // timeout은 (남은 예상시간) / 2
        // 남은 예상시간이 분 단위이기 때문에 timeout의 최소 단위는 30초
        let timeout = (Number(busInfo[0]) - reqInfo.alarmTiming) * 0.5 * 1000 * 60;
        console.log("[timeout set] " + timeout / 60 / 1000 + "분")
        console.log(busInfo[0])

        // 버스가 충분히 오지 않았으면, timeout후에 다시 확인
        if( Number(busInfo[0]) - reqInfo.alarmTiming > 1) {
            setTimeout(() => {
                busArrivalAlarm(reqInfo).then( (reqInfo) => {
                    resolve(reqInfo)
                })
            }, timeout)
        } else {
            resolve(reqInfo);
        }
        
    })
}

module.exports = {
    busArrivalAlarm
}