module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
