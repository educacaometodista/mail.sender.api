module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('senders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('senders');
  },
};
