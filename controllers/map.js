const { station, userInfo } = require('../models');

const mapInit = (async(req, res, next) => {
    const stationData = await station.findAll();
    res.render('map', {
        user : req.user,
        appKey : process.env.KAKAO_MAP,
        mapArr : stationData
    });
    //console.log(stationData[0].dataValues.statNm);
});

module.exports = {
    mapInit
}