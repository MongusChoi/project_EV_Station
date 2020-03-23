module.exports = (sequelize, DataTypes) => {
    return sequelize.define('article', {
        inputTime : {
            type : DataTypes.DATE,
            allowNull : false
        },
        starPoint: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        title: {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description: {
            type : DataTypes.STRING(100),
            allowNull : false
        }
    }, {
        timestamps : false
    });
}