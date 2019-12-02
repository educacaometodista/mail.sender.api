module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'senders',
      [
        {
          id: 1,
          name: 'Universidade Metodista de São Paulo',
          email: 'informes@metodista.br',
          initials: 'umesp',
          top:
            'http://portal.metodista.br/msg/institucional/comunicados-2019/novo/template/topo-novo-umesp.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Universidade Metodista de Piracicaba',
          email: 'unimep@metodista.br',
          initials: 'unimep',
          top:
            'http://unimep.edu.br/msg/comunicados/2019/novo/template/topo-novo-unimep.jpg',
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
