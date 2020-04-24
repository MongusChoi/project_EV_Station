const parseString = require('xml2js').parseString;
const lodash = require('lodash');
const got = require('got');

const { station } = require('../models');

// 0번 아이디 데이터를 조회해 데이터가 없으면 공공데이터 입력
const insert = (async () => {
    try {
        const exData = await station.findOne({ where : { id : '1' } });
        if(exData) {
            // 현재 데이터가 들어가 있음
            console.log('already insert data');
            return;
        }
        const res = await got.get(process.env.API_LINK);
        let dataArry = [];
        await parseString(res.body, (err, result) => {
            if(err) { throw err; }
            dataArry = result.response.body[0].items[0].item;
            dataArry = lodash.uniqBy(dataArry, (item) => {
                return item.statNm[0];
            });
        });
        await dataArry.forEach((item) => {
            let tempUseTime;        
            // 확인 결과 useTime만 undefined 정보가 들어 있어 판별해줌
            if(item.useTime === undefined) { tempUseTime = '정보 없음'; } 
            else { tempUseTime = item.useTime[0]; }
            station.create({
                statNm : item.statNm[0],
                statAddr : item.addrDoro[0],
                chargerType : item.chgerType[0],
                useTime : tempUseTime,
                lat : item.lat[0],
                lng : item.lng[0]
            });
        });
    } catch (error) {
        console.error(error);
        return;
    }
});

module.exports = {
    insert
}