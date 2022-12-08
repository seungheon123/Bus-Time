# 정류소 버스 도착 시간 알리미 챗봇 
<img src="https://user-images.githubusercontent.com/52253037/206446856-4b1818c3-169e-42eb-b207-6fba4d0771db.png" width = "450" height= "750" />


## 순서
*[ About the project](#About-the-project)  
*[ Getting Started](#Getting-Started)  
*[ 프로젝트 구조 / 동작 방식](#-프로젝트-구조-/-동작-방식)  
*[ Usage](#Usage)  
*[ Roadmap](#Roadmap)  
*[ Contributing](#Contributing)  
*[ License](#License)  
*[ Contact](#Contact)  

## About the project
사람들은 버스 도착 정보 어플과 채팅 어플을 각각 따로 사용한다. 때문에 두 어플을 번갈아 사용하는 불편함이 있다. 
해당 프로젝트는 챗봇과 버스 도착 알람 서비스를 결합하여 이러한 불편함을 해결할 수 있다고 예상한다.

본 서비스는 LINE 챗봇을 기반으로 하여 오픈 API를 사용해, 채팅 형식으로 버스 도착 알람 서비스를 제공한다.

* Chatbot
  * [Node.js](https://nodejs.org/ko/download/)
  * [Express](https://expressjs.com/ko/)
  
* API handler
  * [Node.js](https://nodejs.org/ko/download/)
  * [Request.js](https://www.npmjs.com/package/request)
  


## Getting Started
*개발자
1. Clone Repository  
터미널을 열고 다음을 입력
git clone https://github.com/seungheon123/Bus-Time.git  

2. Node.js Download
터미널을 열고 다음을 입력  
npm install  

3. .env 파일 생성  
아래 [.env 파일 설정](#.env 파일 설정) 을 보고 자신의 것으로 작성

4. node.js로 실행  

*사용자  
LINE 어플 다운로드 -> 친구추가 -> @759gotoj 입력  

<img src="https://user-images.githubusercontent.com/52253037/206449669-1706f52c-cdf2-4a78-b4c8-915a714627b1.png" width = "20%" height= "20%" align="left"/><br> </br> <br> </br><br> </br> <br> </br><br> </br> <br> </br><br> </br> <br> </br><br> </br> <br> </br>

## 프로젝트 구조 / 동작 방식
![KakaoTalk_20221207_215639781](https://user-images.githubusercontent.com/115313598/206440180-76f08a12-697e-475a-80da-015a9b8c3bbf.png)

* 구조
  * Node.js를 이용해 API 처리, chatbot 구현
  * Aws를 이용해 인프라 구축 및 관리

* 동작 방식
  * 사용자로부터 명령어를 입력 받으면 API를 호출하여 정보를 받아온다.
  * 데이터를 파싱, 유효한 데이터를 챗봇을 통해 사용지에게 전송한다.

## Usage
1. .env 파일에 API Key를 채워넣는다.
2. Node.js를 통해 서비스를 시작한다.
3. 사용자의 명령어에 해당하는 서비스를 제공한다.


## Roadmap
* [X] 특정 정류장 검색
* [X] 중복된 이름의 정류장 구분
* [X] 정류장의 특정 버스 도착 정보 구현
* [ ] 정류장의 전체 버스 도착 정보 구현
* [X] 도착 알람 기능 추가


## Contributing
프로젝트 참여, 개발을 환영합니다. 귀하의 기여에 감사드립니다.
프로젝트 발전을 위한 방법이 있으시면 프로젝트를 fork하신 후 pull request를 부탁드립니다.

1. Fork the project
2. Create your Feature Branch (```git checkout -b feature/newFeature```)
3. Commit your Changes (```git commit -m 'Add some NewFeature'```)
4. Push to the Branch (```git push origin feature/NewFeature```)
5. Open a Pull Request

## License
Distributed under the MIT License.
자세한 사항은 ```LICENSE.txt``` 파일을 참조바랍니다.

## Contact
* 한승헌(2019102238)  seungheon123@khu.ac.kr
* 허준(2019102242)   2019102242@khu.ac.kr
* 임채언(2018102225)  djscodla@khu.ac.kr
* 백현경(2020110477)  2020110477@khu.ac.kr
* 노장한(2022105683)  shwkdgks1@khu.ac.kr

Project Link: [https://github.com/seungheon123/Bus-Time/](https://github.com/seungheon123/Bus-Time/)

## .env 파일 설정
DOMAIN =    
LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply'   
LINE_PUSH_URL = 'https://api.line.me/v2/bot/message/push'   
CHATBOT_TOKEN =     
SERVICE_KEY = 경기도_버스도착정보 조회 api    
KEY= 경기도_정류소 조회 api    
ROUTE_KEY = 경기도_버스노선 조회 api    
