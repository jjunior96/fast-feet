import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Orders from '../app/models/Orders';
import File from '../app/models/File';
import Deliveryman from '../app/models/Deliveryman';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliveryman, Orders];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connectionDatabase = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connectionDatabase))
      .map(
        model =>
          model.associate && model.associate(this.connectionDatabase.models)
      );
  }
}

export default new Database();
