const request = require('request');


// 경기도 버스 정류소 API
const Station_URL = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList';
const Station_Key = 'BB8vD0wXD9kiGSKImrMLRfIgr1k7L6YEyYMKofhj/1JKJEoUPcBnDUGxx6K7db66AaNugTg1DtkYg8r2tUDIiA==';
// 경기도 노선 조회 기능. 키값은 위에거랑 공유
const Route_URL = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationViaRouteList';

// 경기도 버스도착정보 조회 API
const BusArrival_URL = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList';
const BusArrival_Key = '3NEtY8P7tLlXUJtdgstFMqDvwt%2FYg1jcxchYNhThC5OQAT0CPKC%2BskRCn1nebyPuU%2BMtwGtt9d9%2BREAqUOed%2Bg%3D%3D';

var convert = require('xml-js'); // xml 파일을 json으로 변환


// 정류소 ID 받아오기
var queryParams_GetStationID = '?' + encodeURIComponent('serviceKey') + '=' + Station_Key; /* Service Key*/
queryParams_GetStationID += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent('사색의광장'); /* 입력값: 사색의 광장 */
var requestURL1 = Station_URL + queryParams_GetStationID;

request.get(requestURL1, (err, res, body) => {

  if (err) {
    console.log('err => ' + err);
  } else {
    if (res.statusCode == 200) {
      var result = body;
      var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
      const obj = JSON.parse(xmlToJson); // json 파싱
      
      console.log(obj.response.msgBody.busStationList[0].stationId._text); // 사색의 광장 이름인 정류소가 두개네요
      console.log(obj.response.msgBody.busStationList[1].stationId._text);
    }
  }
})

// 받아온 StationID로 해당 정류소를 지나가는 노선의 RouteID 검색 -> 우리가 알고자 하는 버스의 노선ID 알 수 있다
var queryParams_GetRouteID = '?' + encodeURIComponent('serviceKey') + '=' + Station_Key; /* Service Key*/
queryParams_GetRouteID += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent('228000708');
var requestURL2 = Route_URL + queryParams_GetRouteID;

request.get(requestURL2, (err, res, body) => {
  if (err) {
    console.log('err => ' + err);
  } else {
    if (res.statusCode == 200) {
      var result = body;
      var givenRoute = '5100';
      var search = false;
      var where;
      var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
      const obj = JSON.parse(xmlToJson);
      const routeList = obj.response.msgBody.busRouteList;

      for (var i = 0; i < routeList.length; i++) {
        if (routeList[i].routeName._text == givenRoute) {
          search = true;
          where = i;
        }
      }

      if (search) {
        console.log(routeList[where].routeId._text);
      }
    }
  }
})

