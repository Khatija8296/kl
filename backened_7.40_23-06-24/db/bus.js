const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');
const { Register } = require('./registerModel');

// Bus Information Model
const Bus = sequelize.define('Bus', {
  busId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  busNo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  busType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  departure: {
    type: DataTypes.DATE,
    allowNull: false
  },
  arrival: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  datesAvailable: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true
});

// Bus Route Model
const BusRoute = sequelize.define('BusRoute', {
  routeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bus,
      key: 'busId'
    },
    onDelete: 'CASCADE'
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false
  },
  routeTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true
});

// Bus Facilities Model
const BusFacility = sequelize.define('BusFacility', {
  facilityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bus,
      key: 'busId'
    },
    onDelete: 'CASCADE'
  },
  facility: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true
});

// Bus Reviews Model
const BusReview = sequelize.define('BusReview', {
  reviewId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busId: {
    type: DataTypes.INTEGER,
    references: {
      model: Bus,
      key: 'busId'
    },
    onDelete: 'CASCADE'
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true
});

// Define associations
Bus.hasMany(BusRoute, { as: 'routes', foreignKey: 'busId' });
Bus.hasMany(BusFacility, { as: 'facilities', foreignKey: 'busId' });
Bus.hasMany(BusReview, { as: 'reviews', foreignKey: 'busId' });

BusRoute.belongsTo(Bus, { foreignKey: 'busId' });
BusFacility.belongsTo(Bus, { foreignKey: 'busId' });
BusReview.belongsTo(Bus, { foreignKey: 'busId' });

module.exports = {
  Bus,
  BusRoute,
  BusFacility,
  BusReview
};
