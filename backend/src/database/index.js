import Sequelize from 'sequelize';

import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connectionDatabase = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connectionDatabase))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
