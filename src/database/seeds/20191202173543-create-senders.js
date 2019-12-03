module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'senders',
      [
        {
          id: 1,
          name: 'Universidade Metodista de São Paulo',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Universidade Metodista de Piracicaba',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Faculdade Metodista Centenário',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Centro Universitário Metodista Izabela Hendrix',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Centro Universitário Metodista IPA',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Faculdade Metodista Granbery',
          email: 'informes@metodista.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('senders', null, {});
  },
};
