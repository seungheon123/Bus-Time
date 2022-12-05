const request = require('request');
var convert = require('xml-js'); // xml 파일을 json으로 변환
const Station_Key = '3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D';
const Route_URL = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList';



function OneStationID (RouteID){
var queryParams_GetRouteID = '?' + encodeURIComponent('serviceKey') + '=' + Station_Key; /* Service Key*/
queryParams_GetRouteID += '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent(RouteID);//중복된 정류소명의 루트아이디 중 아무거나
var requestURL3 = Route_URL + queryParams_GetRouteID;
var convert = require('xml-js'); // xml 파일을 json으로 변환

//중복된 정류장 이름, stationId 두개 -> 다음 정류장 이름 안내 (~방면)
return request.get (requestURL3,(err, res, body) => {
    return new Promise((resolve, reject) => {
    if (err) {
        console.log('err => ' + err);
      } else {
        if (res.statusCode == 200) {
            var result = body;
            var search = false;
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            const obj = JSON.parse(xmlToJson);
            const routeStationList = obj.response.msgBody.busRouteStationList;
           
            var lst=[];

            for (var i = 0; i < routeStationList.length; i++){
                if (routeStationList[i].stationName._text == "사색의광장"){
                  if (i == routeStationList.length - 1) {//다음정류장 없는경우, 리스트의 끝
                    lst.push("다음정류장이 없습니다");
                  }
                  else {lst.push(routeStationList[i+1].stationName._text + "방면") ;}
                    //app.post로 각각 경우에 어느 방면인지 알림 및, 하나의 stationId 선택받음
                }
            }
            resolve(lst);
        }
      }
    
})
})
    
}

module.exports = OneStationID;
