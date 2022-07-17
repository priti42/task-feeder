'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: "userid" });
    }
  }
  Task.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'users',
        key: 'id'
      }
    },
    taskname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskdescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskdate:{
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
    timestamps: true
  });
  return Task;
};