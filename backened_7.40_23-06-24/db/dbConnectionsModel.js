// const { Sequelize } = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: false // Disable SSL
//   }
// });

// module.exports = { sequelize };
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
  }
);
module.exports = { sequelize };

// Continue with syncing and other operations
