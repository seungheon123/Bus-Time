const request = require('request');
var convert = require('xml-js'); // xml 파일을 json으로 변환
const Station_URL = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList';
const Route_URL = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationViaRouteList';

// 정류소 ID 받아오기
// 입력값: 정류소 명 (ex: '사색의광장')
// 출력값: 정류소 ID (ex: '228000708')

function GetStationID(GivenStationName) {
    return new Promise((resolve, reject) => {
        // console.log(GivenStationName);
        var queryParams_GetStationID = '?' + encodeURIComponent('serviceKey') + '=' + process.env.KEY; /* Service Key*/
        queryParams_GetStationID += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(GivenStationName); /* 입력값 */
        var requestURL1 = Station_URL + queryParams_GetStationID;
    
        request.get(requestURL1, (err, res, body) => {
            var StationID;
            if (err) {
                console.log('err => ' + err);
                reject(err);
            } else {
                var result = body;
                var xmlToJson = convert.xml2json(result, { compact: true, spaces: 4 });
                const obj = JSON.parse(xmlToJson); // json 파싱

                if (res.statusCode == 200) {

                    if (!obj.response.msgBody) {
                        console.log("wrong station name")
                        resolve("");
                        return;
                    }
                    const stationList = obj.response.msgBody.busStationList;
                    var count = 0;
    
                    // console.log(stationList[0].stationId._text);
                    for (var i = 0; i < stationList.length; i++) {
                        if (stationList[i].stationName._text == GivenStationName) {
                            // console.log(stationList[i].stationId._text);
                            count++;
                            StationID = stationList[i].stationId._text;
                        }
                    }
    
                    if (count > 1) {
                        // 현경님 함수 호출
                    }
                    resolve(StationID);
                } else {
                    console.dir(obj, { depth: null });
                    reject("response is not 200");
                }
            }
        })
    })
}



// 받아온 StationID로 해당 정류소를 지나가는 노선의 RouteID 검색 -> 우리가 알고자 하는 버스의 노선ID 알 수 있다
// 입력값: 정류소 ID, 원하는 노선 이름(ex: '5100')
// 출력값: 노선 ID (ex: '00000000')
function GetRouteID(StationID, GivenRoute) {
    return new Promise((resolve, reject) => {
        // console.log(GivenStationName);
        var queryParams_GetRouteID = '?' + encodeURIComponent('serviceKey') + '=' + process.env.KEY; /* Service Key*/
        queryParams_GetRouteID += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent(StationID); /* 입력값 */
        var requestURL2 = Route_URL + queryParams_GetRouteID;
    
        request.get(requestURL2, (err, res, body) => {
            var RouteID;
            if (err) {
                console.log('err => ' + err);
                reject(err);
            } else {
                var result = body;
                var xmlToJson = convert.xml2json(result, { compact: true, spaces: 4 });
                const obj = JSON.parse(xmlToJson); // json 파싱
                var search = false;
                var where;

                if (res.statusCode == 200) {

                    if (!obj.response.msgBody) {
                        console.log("wrong route number")
                        resolve("");
                        return;
                    }
                    const routeList = obj.response.msgBody.busRouteList;
    
                    for (var i = 0; i < routeList.length; i++) {
                        if (routeList[i].routeName._text == GivenRoute) {
                            search = true;
                            where = i;
                        }
                    }
    
                    if (search) {
                        RouteID = routeList[where].routeId._text;
                    }
                    resolve(RouteID);
                } else {
                    console.dir(obj, { depth: null });
                    reject("response is not 200");
                }
            }
        })
    })
}

module.exports = {
    GetStationID,
    GetRouteID,
}