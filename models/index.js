const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'test';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.article = require('./article')(sequelize, Sequelize);
db.reply = require('./reply')(sequelize, Sequelize);
db.station = require('./station')(sequelize, Sequelize);
db.userInfo = require('./userInfo')(sequelize, Sequelize);

db.userInfo.hasMany(db.article);
db.userInfo.hasMany(db.reply);

db.article.hasMany(db.reply);

db.article.belongsToMany(db.station, { through : 'article_station'});
db.station.belongsToMany(db.article, { through : 'article_station'});

module.exports = db;