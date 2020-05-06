# Project EV Station

## 1. 개요

project ev station은 외부 데이터를 크롤링 하여 전국의 전기차 충전소 정보를 가져오고, 
지도에 표시해주는 프로젝트 입니다. 로그인 시 본인의 차량을 기입하면 본인 차를 충전 할 수 있는
전기차 충전소만 표시해 주는 기능도 추가할 예정입니다.

현재는 개발중이며 해당 기능 외에도 게시판, 충전소 별점/댓글 기능을 추가하여 간단한 소규모 커뮤니티를
구현할 예정입니다.

## 2. 사용 기술/프레임워크

- Node.js
    - express
    - express-session
    - express generator
    - bcryptjs
    - mysql2
    - passport
        - passport-kakao
        - passport-local
    - sequelize
    - got
    - lodash
    - pug
- AWS-ec2
- 가비아 도네임 서비스
- Kakao Map API
- nginx
- https(letsencrypt 인증)
