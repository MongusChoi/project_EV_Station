module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reply', {
        inputTime : {
            type : DataTypes.DATE,
            allowNull : false
        },
        desc : {
            type : DataTypes.STRING(100),
            allowNull : false
        }
    }, {
        timestamps : false,
        charset:'utf8',
        collate:'utf8_general_ci'
    })
}