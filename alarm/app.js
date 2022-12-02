const request = require('request');

//경기도 버스노선조회
const Station_Key = '3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D';
const Route_URL = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList';
//실시간 버스도착시간조회
const BusArrival_URL = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem';
const BusArrival_Key = '3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D';


var queryParams_GetRouteID = '?' + encodeURIComponent('serviceKey') + '=' + Station_Key; /* Service Key*/
queryParams_GetRouteID += '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent('200000115');//중복된 정류소명의 루트아이디 중 아무거나
var requestURL3 = Route_URL + queryParams_GetRouteID;
var convert = require('xml-js'); // xml 파일을 json으로 변환

//중복된 정류장 이름, stationId 두개 -> 다음 정류장 이름 안내 (~방면) -> 사용자에게 입력받아와서 처리
request.get (requestURL3,(err, res, body) => {
    if (err) {
        console.log('err => ' + err);
      } else {
        if (res.statusCode == 200) {
            var result = body;
            var search = false;
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            const obj = JSON.parse(xmlToJson);
            const routeStationList = obj.response.msgBody.busRouteStationList;
           
            for (var i = 0; i < routeStationList.length; i++){
                if (routeStationList[i].stationName._text == "사색의광장"){
                  if (i == routeStationList.length - 1) {//다음정류장 없는경우, 리스트의 끝
                    console.log("다음 정류장이 없습니다");
                  }
                  else {
                    console.log(routeStationList[i+1].stationName._text,"방면",);
                  }
                    //app.post로 각각 경우에 어느 방면인지 알림 및, 하나의 stationId 선택받음
                }
            }
        }
      }
    
})




//타이머 시간 입력받아서 입력받은 시간값이 나올때까지 request.get
var queryParams2 = '?' + encodeURIComponent('serviceKey') + '=' + BusArrival_Key;
queryParams2 += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('203000125') + '&'+ encodeURIComponent('routeId')+'='+ encodeURIComponent('200000115') + '&' + encodeURIComponent('staOrder') + '=' + encodeURIComponent('4');
var requestURL4 = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey=3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D&stationId=203000125&routeId=200000115&staOrder=4';
//'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey=3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D&stationId=203000125&routeId=200000115&staOrder=4'
request.get (requestURL4, (err,res, body) => {
    if (err) {
        console.log('err => ' + err);
      } else {
        if (res.statusCode == 200) {
            var result = body;
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            const obj = JSON.parse(xmlToJson);
            const ArrivalItem = obj.response.msgBody.busArrivalItem;
           
            console.log("버스도착", ArrivalItem.predictTime1._text,"분 전입니다.");
        }
      }
})

