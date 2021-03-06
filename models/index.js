'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.hasMany(db.Board);  //1:Many 관계를 맺겠다.
db.Board.belongsTo(db.User);  //1:Many   
db.Board.belongsToMany(db.Tag, {through:"board_tag"});   //Many:Many  다:다 관계에선 새로운 table이 있어야 함.그래서 생성
db.Tag.belongsToMany(db.Board, {through:"board_tag"});   //Many:Many


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
