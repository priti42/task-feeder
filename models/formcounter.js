'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FormCounter.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    formId: {
      type: DataTypes.STRING,
      unique: true
    },
    incrementer: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'FormCounter',
  });
  return FormCounter;
};