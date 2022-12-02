var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'mk2ahKWDMaSAnFFTYtmqGqKJDteEGFtimIys5lxpqlmvmkSkp/UV3YkmKwJUjFyrISD8k/dcyNM4uMHWXC2Yf14EgxzbCGpZeNrpS6kmwft04F4AVf1427WEoXeDfaVBvZgbsw0qoZYq1yrT3MWfEgdB04t89/1O/w1cDnyilFU='
const bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "도메인"
const sslport = 23023;

app.use(bodyParser.json());

app.post('/hook', function (request, response) {

    var eventObj = request.body.events[0];
    var start;
    var bus;
    console.log('======================', new Date() ,'======================');
    if(eventObj.message.text.substring(0,2)=="출발") start = eventObj.message.text.substring(3,eventObj.message.text.length);
    if(eventObj.message.text.substring(0,2)=="버스") bus = eventObj.message.text.substring(3,eventObj.message.text.length);
    // request log
    console.log(start);
    console.log(bus);
    request.post(
      {
          url: TARGET_URL,
          headers: {
              'Authorization': `Bearer ${TOKEN}`
          },
          json: {
              "replyToken":eventObj.replyToken,
              "messages":[
                  {
                      "type":"text",
                      "text":start
                  },
                  {
                      "type":"text",
                      "text":bus
                  }
              ]
          }
      },(error, response, body) => {
          console.log(body)
      });
  

    response.sendStatus(200);
    
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
  
