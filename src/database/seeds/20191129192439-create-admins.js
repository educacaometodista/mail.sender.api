module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          isBetaMember: false,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
