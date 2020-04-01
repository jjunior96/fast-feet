module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primatyKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      postcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      complement: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};
