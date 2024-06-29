


// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure

// const Booking = sequelize.define('Booking', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   customerName: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   phoneNumber: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//   },
//   address: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   busId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   selectedSeats: {
//     type: DataTypes.ARRAY(DataTypes.TEXT),
//     allowNull: true,
//   },
//   discountAmount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   GST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   cartTotal: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Booking',
//   tableName: 'Bookings',
//   timestamps: true,
// });

// Booking.sync()
//   .then(() => console.log('Driver table synced'))
//   .catch(err => console.error('Failed to sync Driver table:', err));

// module.exports = { Booking };


const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  selectedSeats: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  discountAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  GST: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  cartTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'Bookings',
  timestamps: true,
});

Booking.sync()
  .then(() => console.log('Booking table synced'))
  .catch(err => console.error('Failed to sync Booking table:', err));

module.exports = { Booking };
