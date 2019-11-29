module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mailer', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sender_id: {
        type: Sequelize.INTEGER,
        references: { model: 'senders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('mailer');
  },
};
