var express = require('express');
// 환경변수 관리를 위해서 dotenv 사용
require("dotenv").config();

const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = process.env.DOMAIN;
const sslport = 23023;

const bodyParser = require('body-parser');

const { reply, push } = require('./src/chatbot');
const { getBusInfo, callRequest } = require('./src/bus');
const { busArrivalAlarm } = require('./src/alarm')
const { parseRequest } = require('./src/parseRequest');

var app = express();
app.use(bodyParser.json());

app.post('/hook', async function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    
    // reqInfo: { orderType, station, busId, alarmTiming}
    let reqInfo = parseRequest(message.text);

    // orderType에 따라서 어떤 대답을 보낼지 정하고 replyString에 저장
    let replyString = ""
    if( reqInfo.orderType === "printAll") {
      replyString = await callRequest(reqInfo);
    }
    else if( reqInfo.orderType === "setAlarm") {
      // busList: [busPredictTime1, busPredictTime2] 
      // 단위: 분 전
      let busList = await getBusInfo(reqInfo);

      // 라인 API로 메세지 보내기
      if(busList[0] === undefined) {
        replyString = "현재 운행중인 버스가 없습니다"
      } else {
        replyString = reqInfo.station + "에서 " + reqInfo.busId + "가 " + busList[0] + "분 후 도착예정입니다.";
        
        // Return of busArrivalAlarm: Promise()
        busArrivalAlarm(reqInfo).then( (info) => {
          push(source.userId, info.busId + "번 버스가 곧 도착합니다")
        })
      }
    }

    reply(eventObj.replyToken, replyString);

    res.sendStatus(200);
    console.log("[200 OK]")
    console.log("[reply] " + replyString)
});



try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  
