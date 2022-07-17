'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'users',
          key: 'id'
        }
      },
      taskId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taskname: {
        type: Sequelize.STRING
      },
      taskdescription: {
        type: Sequelize.STRING
      },
      taskdate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};