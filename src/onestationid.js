const request = require('request');
var convert = require('xml-js'); // xml 파일을 json으로 변환
const Station_Key = '3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D';
var Route_URL2 = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList';
// 정류소 ID 받아오기
// 입력값: 정류소 명 (ex: '사색의광장')
// 출력값: 정류소 ID (ex: '228000708')

function OneStationID(RouteID,name) {
    return new Promise((resolve, reject) => {
        var queryParams_GetRouteID = '?' + encodeURIComponent('serviceKey') + '=' + Station_Key; /* Service Key*/
        queryParams_GetRouteID += '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent(RouteID); /* 입력값 */
        Route_URL2 = Route_URL2 + queryParams_GetRouteID;
    
        request.get(Route_URL2, (err, res, body) => {
            var StationID = [];
            if (err) {
                console.log('err => ' + err);
                reject(err);
            } else {
                var result = body;
                var xmlToJson = convert.xml2json(result, { compact: true, spaces: 4 });
                const obj = JSON.parse(xmlToJson);

                if (res.statusCode == 200) {

                    if (!obj.response.msgBody) {
                        console.log("error")
                        resolve("");
                        return;
                    }
                    const routeStationList = obj.response.msgBody.busRouteStationList;
    
                    var lst = [];

                    for (var i = 0; i < routeStationList.length; i++) {
                        if (routeStationList[i].stationName._text == name) {

                            if (i == routeStationList.length - 1) {
                              lst.push("다음정류장이 없습니다");//해당 정류장이 종점인 경우.
                              lst.push(routeStationList[i].stationId._text);//해당정류장(i)의 stationid값을 lst에 추가
                            }
                            else {
                              lst.push(routeStationList[i+1].stationName._text + "방면") ;//다음정류장(i+1번째)명을 lst에 추가
                              lst.push(routeStationList[i].stationId._text);//(i번째) 정류장 stationid값을 lst에 추가
                            }
                        }
                    }
                    resolve(lst);
                  } else {
                    console.dir(obj, { depth: null });
                    reject("response is not 200");
                }
            }
        })
    })
}

module.exports = OneStationID;
