import Sequelize, { Model } from 'sequelize';

class Sender extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        provider: Sequelize.STRING,
        email: Sequelize.STRING,
        initials: Sequelize.STRING,
        top: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async sender => {
      if (sender.initials) {
        sender.initials = await sender.initials.toLowerCase();
      }
    });

    return this;
  }
}

export default Sender;
