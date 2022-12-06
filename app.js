var express = require('express');
// 환경변수 관리를 위해서 dotenv 사용
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = process.env.DOMAIN;
const sslport = 23023;

const bodyParser = require('body-parser');

const { recvMessage, makeMessage } = require('./src/chatbot');
const { GetStationID, GetRouteID } = require('./src/bus/getID.js');
const OneStationID = require('./src/bus/onestationid.js');

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

  console.log(StationID[0]);
  console.log(StationID[1]);

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
  
    var s = "1번 : " + m[0] + " \n2번 : " +m[2];
    recvMessage(eventObj.replyToken , s);

  }
  // console.log(afterMessage[0]);
  // console.log(afterMessage[1]);
  var replyMessage;
  var replyM1 = "";
  var replyM2 = "";
  if(RouteID == undefined){
    replyMessage = '없는 버스 번호입니다';
  }
  else{
    replyM1 += afterMessage[1] + ' 번 버스 도착 정보입니다.\n';
    replyM2 = await makeMessage(source.userId, StationID[0],RouteID);
    replyMessage = replyM1 + replyM2;
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