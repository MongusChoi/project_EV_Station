const url = require('url');
const lodash = require('lodash');
const got = require('got');
const parseString = require('xml2js').parseString;
const { station, userInfo } = require('../models');

const mapInit = async(req, res, next) => {
    const stationData = await station.findAll();
    res.render('map', {
        user : req.user,
        appKey : process.env.KAKAO_MAP,
        mapArr : stationData
    });
};

const detail = async (req, res) => {
    let stationId = await url.parse(req.url, true).query.id;
    const apiData = await got.get(process.env.API_LINK);
    let dataArr = [];
    await parseString(apiData.body, (err, result) => {
        if(err) { throw err; }
        dataArr = result.response.body[0].items[0].item;
        dataArr = dataArr.filter(item => item.statId[0] === stationId);
    });

    res.render('detail', {
        stationDataArray : dataArr
    });
}

module.exports = {
    mapInit,
    detail
}