module.exports = (sequelize, DataTypes) => {
    return sequelize.define('station', {
        statNm : {
            // 충전소 이름
            type : DataTypes.STRING(100),
            allowNull : false
        },
        statID : {
            // 충전소 id
            type : DataTypes.STRING(20),
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
                04 : DC콤보
                05 : 06과 같음...왜...?
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
            type : DataTypes.FLOAT,
            allowNull : false
        },
        lng : {
            // 충전기 경도
            type : DataTypes.FLOAT,
            allowNull : false
        }
    }, {
        timestamps : false,
        charset:'utf8',
        collate:'utf8_general_ci'
    })
}