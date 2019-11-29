import Sequelize, { Model } from 'sequelize';

class Sender extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Sender;
