module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userInfo', {
        email : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        password : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        nickname : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        myCar : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    }, {
        timestamps : false
    });
}