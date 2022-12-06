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
                const obj = JSON.parse(xmlToJson); // json 파싱

                if (res.statusCode == 200) {

                    if (!obj.response.msgBody) {
                        console.log("error")
                        resolve("");
                        return;
                    }
                    const routeStationList = obj.response.msgBody.busRouteStationList;
    
                    var lst = [];
                    // console.log(stationList[0].stationId._text);
                    for (var i = 0; i < routeStationList.length; i++) {
                        if (routeStationList[i].stationName._text == name) {
                            // console.log(stationList[i].stationId._text);
                            if (i == routeStationList.length - 1) {
                              lst.push("다음정류장이 없습니다");
                              lst.push(routeStationList[i].stationId._text);
                            }
                            else {
                              lst.push(routeStationList[i+1].stationName._text + "방면") ;
                              lst.push(routeStationList[i].stationId._test);
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
