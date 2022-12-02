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

var app = express();
app.use(bodyParser.json());

app.post('/hook', async function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;
    const replyMessage = await makeMessage(source.userId, message.text);
    // request log
    var afterMessage = message.text.split('\n');
    console.log(afterMessage[0]);
    console.log(afterMessage[1]);
    console.log('======================', new Date() ,'======================');
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    recvMessage(eventObj.replyToken, replyMessage);
  

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
  
