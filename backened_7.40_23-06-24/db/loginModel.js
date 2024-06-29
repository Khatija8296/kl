const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Import the shared Sequelize instance

const Login = sequelize.define('Login', {
  loginId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync database:', err));

module.exports = { Login };
