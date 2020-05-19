const url = require('url');
const lodash = require('lodash');
const got = require('got');
const parseString = require('xml2js').parseString;
const { station, userInfo } = require('../models');
const Op = require('sequelize').Op;

// 맵 초기 렌더
const mapInit = async(req, res, next) => {
    res.render('map', {
        user : req.user,
        appKey : process.env.KAKAO_MAP,
        mapArr : []
    });
};

// 충전소의 상세 정보를 가져와 렌더해주는 함수
const detail = async (req, res) => {
    let stationId = await parseQueryStringSync(req);
    const apiData = await got.get(process.env.API_LINK);
    let dataArr = [];
    parseString(apiData.body, (err, result) => {
        if(err) { throw err; }
        console.log(result);
        // dataArr = result.response.body[0].items[0].item;
        // dataArr = dataArr.filter(item => item.statId[0] === stationId.id);
    });

    res.render('detail', {
        stationDataArray : dataArr
    });
}

const getStationPosition = async(req, res, next) => {
    const { statID } = req.body;
    try{
        const stationData = await station.findOne({ where : { statID } });
        return res.send({stationData});
    } catch(error) {
        console.error(error);
    }
}

// 클라이언트에서 받은 현재 위치를 기반으로 주변에 있는 충전소 정보를 전송하는 함수
const setMarker = async(req, res) => {
    const { lat, lng } = req.body;
    try{
        const dataArray = await findMarkerPosition(Number(lat), Number(lng));
        res.send({
            mapArr : dataArray
        });
    }
    catch(error){
        console.error(error);
    }
}

// 쿼리스트링 파싱하는 함수
function parseQueryStringSync(req) {
    return new Promise(async(resolve, reject) => {
        try {
            return resolve(url.parse(req.url, true).query);
        } catch(err) {
            return reject(err);
        }
    })
}

// 300m 근방에 위치한 충전소 정보를 검색해 return 하는 함수
function findMarkerPosition(curLat, curLng) {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await station.findAll({
            where : {
                [Op.and] : [{
                    lat : {
                        [Op.gte] : curLat - 0.003260869565217,
                        [Op.lte] : curLat + 0.003260869565217
                    }
                }, {
                    lng : {
                        [Op.gte] : curLng - 0.003260869565217,
                        [Op.lte] : curLng + 0.003260869565217
                    }
                }]
            }
        });
        resolve(result);
        } catch(err) {
            return reject(err);
        }
    });
}

module.exports = {
    mapInit,
    detail,
    setMarker,
    getStationPosition
}