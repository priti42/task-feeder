'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'type',
        {
          type: Sequelize.TEXT,
          defaultValue: "user",
          allowNull: false
        })
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'type')
    ]);
  }
};
