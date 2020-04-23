module.exports = (sequelize, DataTypes) => {
    return sequelize.define('station', {
        statNm : {
            // 충전소 이름
            type : DataTypes.STRING(100),
            allowNull : false
        },
        statAddr : {
            // 충전소 주소
            type : DataTypes.STRING(150),
            allowNull : false,
        },
        chargerType : {
            /*
                충전기 타입
                01 : DC차데모
                03 : DC차데모 + AC3상
                06 : DC차데모 + AC3상 + DC콤보
            */
            type : DataTypes.STRING(4),
            allowNull : false
        },
        useTime : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        lat : {
            // 충전기 위도
            type : DataTypes.FLOAT
        },
        lng : {
            // 충전기 경도
            type : DataTypes.FLOAT
        }
    }, {
        timestamps : false,
        charset:'utf8',
        collate:'utf8_general_ci'
    })
}