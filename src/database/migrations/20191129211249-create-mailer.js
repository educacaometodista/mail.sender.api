module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mailer', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('mailer');
  },
};
