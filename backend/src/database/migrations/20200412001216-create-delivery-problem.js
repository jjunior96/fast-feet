module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('delivery_problem', {
      id: {
        allowNull: false,
        autoIncriment: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      description: {
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
    return queryInterface.dropTable('delivery_problem');
  },
};
