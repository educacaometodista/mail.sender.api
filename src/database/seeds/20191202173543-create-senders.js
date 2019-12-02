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
          color: '#01549D',
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
          color: '#d5932f',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Faculdade Metodista Centenário',
          email: 'informes.centenario@centenario.metodista.br',
          initials: 'fames',
          top:
            'http://metodistacentenario.com.br/msg/comunicados/2019/novo/template/topo-novo-fames.jpg',
          color: '#246834',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Centro Universitário Metodista Izabela Hendrix',
          email: 'informes.imih@izabelahendrix.metodista.br',
          initials: 'izabela',
          top:
            'http://izabelahendrix.edu.br/msg/comunicados/2019/novo/template/topo-novo-izabela.jpg',
          color: '#a32d27',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Centro Universitário Metodista IPA',
          email: 'comunicados.ipa@ipametodista.edu.br',
          initials: 'ipa',
          top:
            'http://ipametodista.edu.br/msg/comunicados/2019/novo/template/topo-novo-ipa.jpg',
          color: '#b8974a',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Faculdade Metodista Granbery',
          email: 'informes.granbery@granbery.metodista.br',
          initials: 'granbery',
          top:
            'http://granbery.edu.br/msg/comunicados/2019/novo/template/topo-novo-granbery.jpg',
          color: '#242855',
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
