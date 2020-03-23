module.exports = (sequelize, DataTypes) => {
    return sequelize.define('userInfo', {
        email : {
            type : DataTypes.STRING(50),
            allowNull : true
        },
        password : {
            type : DataTypes.STRING(50),
            allowNull : true
        },
        nickname : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        myCar : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        provider : {
            type : DataTypes.STRING(10),
            allowNull : false,
            defaultValue : 'local'
        },
        snsId : {
            type : DataTypes.STRING(30),
            allowNull : true
        }
    }, {
        timestamps : true,
        paranoid : true,
        charset:'utf8',
        collate:'utf8_general_ci'
    });
}