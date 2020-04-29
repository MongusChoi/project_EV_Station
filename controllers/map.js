const url = require('url');
const { station, userInfo } = require('../models');

const mapInit = (async(req, res, next) => {
    const stationData = await station.findAll();
    res.render('map', {
        user : req.user,
        appKey : process.env.KAKAO_MAP,
        mapArr : stationData
    });
});

const detail = async (req, res) => {
    let queryData = url.parse(req.url, true).query;
    console.log(queryData);
}

module.exports = {
    mapInit,
    detail
}