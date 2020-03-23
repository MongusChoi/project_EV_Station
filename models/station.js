module.exports = (sequelize, DataTypes) => {
    return sequelize.define('station', {
        stationName : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        stationAddress : {
            type : DataTypes.STRING(100),
            allowNull : false,
        }
    }, {
        timestamps : false
    })
}