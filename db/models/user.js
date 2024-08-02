'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {


    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'userID'})
    }
    static associate() {
    }
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};