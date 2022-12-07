# 정류소 버스 도착 시간 알리미 챗봇 
사진 추가 필요


## 순서
[* About the project](#About-the-project)
* Getting Started
  * Prerequisites
  * installation
* 프로젝트 구조 / 동작 방식
* Usage
* Roadmap
* Contributing
* License
* Contact

## About the project
대부분의 사람들은 버스 도착 정보 어플과 채팅 어플을 각각 따로 사용한다. 이런 챗봇 서비스와 버스 도착 알람 서비스를 결합하여 어플을 번갈아 사용하는 불편함을 없앨 수 있다. 또한 향후에 추가 기능을 더 구현하여 확장성 있는 챗봇 서비스가 될 것이라고 예상된다.

본 서비스는 LINE 챗봇을 기반으로 하여 오픈 API를 사용해, 채팅 형식으로 버스 도착 알람 서비스를 제공한다.

* Chatbot
  * [Node.js](https://nodejs.org/ko/download/)
  * [Express](https://expressjs.com/ko/)
  
* API handler
  * [Node.js](https://nodejs.org/ko/download/)
  * [Request.js](https://www.npmjs.com/package/request)
  


## Getting Started
### Prerequisites
사용법과 필요한 항복을 설치하는 방법에 대한 예시입니다.
* npm
```javascript
npm install
```

### installation
다음은 사용자들의 설정 및 사용 방법에 대한 예시입니다. 
1. 라인 채팅에서 챗봇 서비스를 친구추가합니다.
2. asd
3. asd

## 프로젝트 구조 / 동작 방식
[](사진 주소)

* 구조
  * Node.js를 이용해 API 처리, chatbot 구현
  * Aws를 이용해 인프라 구축 및 관리

* 동작 방식
1. 사용자로부터 명령어를 입력 받으면 API를 호출하여 정보를 받아온다.
2. 데이터를 파싱, 유효한 데이터를 챗봇을 통해 사용지에게 전송한다.

## Usage
1. .env 파일에 API Key를 채워넣는다.
2. Node.js를 통해 서비스를 시작한다.
3. 사용자의 명령어에 해당하는 서비스를 제공한다.


## Roadmap
[](사진 주소)
* (O) 특정 정류장 검색
* (O) 특정 정류장 버스 도착 정보 구현
* (O) 중복된 이름의 정류장 구분
* (O) 도착 알람 기능 추가
* (X) ㅁㄴㅇ
추가


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
~~
