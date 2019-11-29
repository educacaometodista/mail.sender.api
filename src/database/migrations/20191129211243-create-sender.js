module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('senders', { id: Sequelize.INTEGER });
  },

  down: queryInterface => {
    return queryInterface.dropTable('senders');
  },
};
