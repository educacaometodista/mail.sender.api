const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Leonardo Almeida',
          email: process.env.LEONARDO_MAIL,
          password_hash: bcrypt.hashSync(process.env.LEONARDO_PASS, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Erick Firmo',
          email: process.env.ERICK_MAIL,
          password_hash: bcrypt.hashSync(process.env.ERICK_PASS, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Thiago Tamosauskas',
          email: process.env.THIAGO_MAIL,
          password_hash: bcrypt.hashSync(process.env.THIAGO_PASS, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Fernando Zancopé',
          email: process.env.FERNANDO_MAIL,
          password_hash: bcrypt.hashSync(process.env.FERNANDO_PASS, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
