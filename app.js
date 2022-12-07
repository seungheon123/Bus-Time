var express = require('express');
// 환경변수 관리를 위해서 dotenv 사용
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = process.env.DOMAIN;
const sslport = 23023;

const bodyParser = require('body-parser');

const { recvMessage, makeMessage, push, confirm } = require('./src/chatbot');
const { GetStationID, GetRouteID } = require('./src/bus/getID.js');
const { busArrivalAlarm } = require('./src/alarm');
const OneStationID = require('./src/onestationid.js');

var app = express();
app.use(bodyParser.json());

app.post('/hook', async function (req, res) {
  var RouteID;
  var StationID;

  var eventObj = req.body.events[0];
  var source = eventObj.source;
  var message = eventObj.message;

  var afterMessage = message.text.split('\n');

  StationID = await GetStationID(afterMessage[0]).catch((err) => console.log(err));

  console.log(StationID);

  RouteID = await GetRouteID(StationID[0], afterMessage[1]).catch((err) => console.log(err));

  console.log(RouteID); // RouteID 출력되도록 수정했습니다


  if (StationID.length > 1) {
    console.log(StationID[0]);
    console.log(StationID[1]);
  
    m = await OneStationID(RouteID, afterMessage[0]).catch((err) => console.log(err));
    if (!m) {
      recvMessage(eventObj.replyToken, "OneStationID오류");  
      return res.sendStatus(400);
    }
    console.log(m[0]);
  
    var a = await confirm(eventObj.replyToken,m[0], m[2]);
    console.log(a);
    if (a == m[0]) {
      StationID[0] = m[1];
    }
    else{
      StationID[0] = m[3];
    }

  }

  // console.log(afterMessage[0]);
  // console.log(afterMessage[1]);
  var replyMessage = "";
  if(RouteID == undefined){
    replyMessage = '없는 버스 번호입니다';
  }
  else{
    replyMessage += afterMessage[1] + ' 번 버스 도착 정보입니다.\n';
    replyMessage += await makeMessage(source.userId, StationID,RouteID);
  }

  // 알람 설정
  if(parseInt(afterMessage[2])) {
    if(RouteID && StationID) {
      busArrivalAlarm({stationId: StationID[0], routeId: RouteID, alarmTiming: parseInt(afterMessage[2])}).then( (info) => {
        push(source.userId, afterMessage[1] + "번 버스가 곧 도착합니다.");
      })
    } else {
      replyMessage += " 알람은 설정되지 않았습니다"
    }
  }

  console.log(replyMessage);
  console.log('------------');
  // request log
  console.log('======================', new Date(), '======================');
  console.log('[request source] ', eventObj.source);
  console.log('[request message]', eventObj.message);
  recvMessage(eventObj.replyToken, replyMessage);

  res.sendStatus(200);
});

try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/' + domain + '/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain + '/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain + '/cert.pem'), 'utf8').toString(),
  };

  HTTPS.createServer(option, app).listen(sslport, () => {
    console.log(`[HTTPS] Server is started on port ${sslport}`);
  });
} catch (error) {
  console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
  console.log(error);
}