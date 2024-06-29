// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   bookingId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// module.exports = { Passenger };


// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const {Booking} = require('./bookingModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// Passenger.belongsTo(Booking); // A passenger belongs to a booking

// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.error('Failed to sync database:', err));

// module.exports = Passenger;

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const {Booking} = require('./bookingModel'); // Import the Booking model

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// Passenger.belongsTo(Booking); // A passenger belongs to a booking
// Booking.hasMany(Passenger);   // A booking has many passengers

// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.error('Failed to sync database:', err));

// module.exports = Passenger;


// passenger.js

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const { Booking } = require('./bookingModel'); // Correctly import Booking model

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// Passenger.belongsTo(Booking); // A passenger belongs to a booking
// Booking.hasMany(Passenger);   // A booking has many passengers

// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.error('Failed to sync database:', err));

// module.exports = {Passenger};

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const { Booking } = require('./bookingModel'); // Ensure correct import

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// Passenger.belongsTo(Booking); // A passenger belongs to a booking

// module.exports = { Passenger };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// module.exports = { Passenger };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// module.exports = { Passenger };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   gender: {
//     type: DataTypes.STRING(10),
//     allowNull: true,
//   },
// });

// module.exports = { Passenger };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   bookingId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.ENUM('Male', 'Female', 'Other'),
//     allowNull: false,
//   },
// }, {
//   tableName: 'Passengers'
// });

// Passenger.belongsTo(Booking, { foreignKey: 'bookingId' });
// Booking.hasMany(Passenger, { foreignKey: 'bookingId' });

// module.exports = { Passenger };

// const { DataTypes } = require('sequelize');
// const { sequelize } = require('./dbConnectionsModel');
// const Booking = require('./bookingModel'); // Import Booking model

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   bookingId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.ENUM('Male', 'Female', 'Other'),
//     allowNull: false,
//   },
// }, {
//   tableName: 'Passengers'
// });

// Passenger.belongsTo(Booking, { foreignKey: 'bookingId' });
// Booking.hasMany(Passenger, { foreignKey: 'bookingId' });

// module.exports = { Passenger };

// const { DataTypes, Model } = require('sequelize');
// const {sequelize} = require('./dbConnectionsModel');
// const {Booking} = require('./bookingModel'); // Import Booking model

// class Passenger extends Model {}

// Passenger.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   bookingId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.ENUM('Male', 'Female', 'Other'),
//     allowNull: false,
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
//   modelName: 'Passenger',
//   tableName: 'Passengers',
//   timestamps: true, // Enable Sequelize timestamps for createdAt and updatedAt
// });

// // Define relationships
// Passenger.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// module.exports = Passenger;

// const Passenger = sequelize.define('Passenger', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   bookingId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   gender: {
//     type: DataTypes.ENUM('Male', 'Female', 'Other'),
//     allowNull: false,
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
// });

// Facility.belongsTo(Bus, { foreignKey: 'busId' });
// Bus.hasOne(Facility, { foreignKey: 'busId' });

// module.exports = { Facility };

const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure
const { Booking } = require('./bookingModel'); // Adjust the path as per your project structure

const Passenger = sequelize.define('Passenger', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Booking,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
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
  modelName: 'Passenger',
  tableName: 'Passengers',
  timestamps: true,
});

// Define associations
Passenger.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Booking.hasMany(Passenger, { foreignKey: 'bookingId', as: 'passengers' });

Passenger.sync()
  .then(() => console.log('Driver table synced'))
  .catch(err => console.error('Failed to sync Driver table:', err));

module.exports = { Passenger };
