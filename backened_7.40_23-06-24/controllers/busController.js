// const { Bus, BusRoute, BusFacility, BusReview } = require('../db/bus');
// const { Op, Sequelize } = require('sequelize');

// function isBusAvailable(from, to, bus) {
//   const fromIndex = bus.indexOf(from);
//   const toIndex = bus.indexOf(to);
 
//   // Check if both stops are in the route and 'from' stop comes before 'to' stop
//   return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
// }
 
// // // Function to calculate total fare based on from and to stops
// // function calculateTotalFare(from, to, bus) {
// //   const fromIndex = bus.busRoute.indexOf(from);
// //   const toIndex = bus.busRoute.indexOf(to);
 
// //   if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
// //     let totalFare = 0;
// //     for (let i = fromIndex; i < toIndex; i++) {
// //       totalFare += route.busRouteFares[i];
// //     }
// //     return totalFare;
// //   } else {
// //     return null; // Handle error case where from or to stops are not found in the route
// //   }
// // }
 


// // Create a new bus record
// const createBus = async (req, res) => {
//   const {
//     busName,
//     busNo,
//     capacity,
//     busType,
//     numberOfSeats,
//     from,
//     to,
//     busRoute,
//     busRouteTimes,
//     departure,
//     arrival,
//     facilities,
//     price,
//     reviews,
//     datesAvailable
//   } = req.body;

//   try {
//     if (!busName || !busNo || !capacity || !busType || !numberOfSeats) {
//       return res.status(400).json({ error: 'busName, busNo, capacity, busType, and numberOfSeats are required fields' });
//     }

//     const newBus = await Bus.create({
//       busName,
//       busNo,
//       capacity,
//       busType,
//       numberOfSeats,
//       from,
//       to,
//       departure,
//       arrival,
//       price,
//       datesAvailable
//     });

//     if (busRoute && busRouteTimes) {
//       for (let i = 0; i < busRoute.length; i++) {
//         await BusRoute.create({
//           busId: newBus.busId,
//           route: busRoute[i],
//           routeTime: busRouteTimes[i]
//         });
//       }
//     }

//     if (facilities) {
//       for (let facility of facilities) {
//         await BusFacility.create({
//           busId: newBus.busId,
//           facility
//         });
//       }
//     }

//     if (reviews) {
//       for (let review of reviews) {
//         await BusReview.create({
//           busId: newBus.busId,
//           review
//         });
//       }
//     }

//     res.status(201).json(newBus);
//   } catch (error) {
//     console.error('Error creating bus record:', error);
//     res.status(500).json({ error: 'Error creating bus record' });
//   }
// };

// // Get all bus records or search buses by query parameters
// const getAllBuses = async (req, res) => {
// //   const { from, to, datesAvailable } = req.query;

// //   try {
// //     let whereConditions = {};

// //     if (from) {
// //       whereConditions.from = from;
// //     }

// //     if (to) {
// //       whereConditions.to = to;
// //     }

// //     if (datesAvailable) {
// //       whereConditions.datesAvailable = {
// //         [Op.contains]: [datesAvailable]
// //       };
// //     }

// //     let buses = await Bus.findAll({
// //       where: whereConditions,
// //       include: [
// //         { model: BusRoute, as: 'routes' },
// //         { model: BusFacility, as: 'facilities' },
// //         { model: BusReview, as: 'reviews' }
// //       ]
// //     });

// //     res.status(200).json(buses);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching bus records' });
// //   }
// // };
// const { from, to, date } = req.query;
 
//   try {
//     let buses;
 
//     // Fetch buses based on date and route availability
//     if (date && from && to) {
//       buses = await Bus.findAll({
//         include: [
//           {
//             model: Bus,
//             where: {
//               datesAvailable: { [Op.contains]: [date] }
//             }
//           },
//           BusRoute,
//           BusFacility,
//           BusReview
//         ]
//       });
 
//       // Filter buses further based on route availability and calculate fare
//       buses = buses.filter(bus => {
//         if (bus && isBusAvailable(from, to, bus.busRoute)) {
//           bus.dataValues.totalFare = calculateTotalFare(from, to, bus); // Calculate and add total fare
//           return true;
//         } else {
//           return false;
//         }
//       });
//     } else {
//       // Fetch all buses without date and route filtering
//       buses = await Bus.findAll({
//         include: [BusRoute, BusFacility, BusReview]
//       });
//     }
 
//     res.status(200).json(buses);
//   } catch (error) {
//     console.error('Error fetching buses:', error);
//     res.status(500).json({ error: 'Error fetching bus records' });
//   }
// };
// // Update a bus record by ID
// const updateBusById = async (req, res) => {
//   const { id } = req.params;
//   const {
//     busName,
//     busNo,
//     capacity,
//     busType,
//     numberOfSeats,
//     from,
//     to,
//     busRoute,
//     busRouteTimes,
//     departure,
//     arrival,
//     facilities,
//     price,
//     reviews,
//     datesAvailable
//   } = req.body;

//   try {
//     const bus = await Bus.findByPk(id);
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }

//     await bus.update({
//       busName,
//       busNo,
//       capacity,
//       busType,
//       numberOfSeats,
//       from,
//       to,
//       departure,
//       arrival,
//       price,
//       datesAvailable
//     });

//     await BusRoute.destroy({ where: { busId: bus.busId } });
//     if (busRoute && busRouteTimes) {
//       for (let i = 0; i < busRoute.length; i++) {
//         await BusRoute.create({
//           busId: bus.busId,
//           route: busRoute[i],
//           routeTime: busRouteTimes[i]
//         });
//       }
//     }

//     await BusFacility.destroy({ where: { busId: bus.busId } });
//     if (facilities) {
//       for (let facility of facilities) {
//         await BusFacility.create({
//           busId: bus.busId,
//           facility
//         });
//       }
//     }

//     await BusReview.destroy({ where: { busId: bus.busId } });
//     if (reviews) {
//       for (let review of reviews) {
//         await BusReview.create({
//           busId: bus.busId,
//           review
//         });
//       }
//     }

//     res.status(200).json(bus);
//   } catch (error) {
//     console.error('Error updating bus record:', error);
//     res.status(500).json({ error: 'Error updating bus record' });
//   }
// };

// // Delete a bus record by ID
// const deleteBusById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bus = await Bus.findByPk(id);
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }
//     await bus.destroy();
//     res.status(200).json({ message: 'Bus deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting bus record:', error);
//     res.status(500).json({ error: 'Error deleting bus record' });
//   }


// };

// const getBusById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bus = await Bus.findByPk(id, {
//       include: ['routes', 'facilities', 'reviews']
//     });
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }
//     res.status(200).json(bus);
//   } catch (error) {
//     console.error('Error fetching bus by ID:', error);
//     res.status(500).json({ error: 'Error fetching bus record' });
//   }
// };

// module.exports = {
//   createBus,
//   getAllBuses,
//   getBusById,
//   updateBusById,
//   deleteBusById
// };


// const { Bus, BusRoute, BusFacility, BusReview } = require('../db/bus');
// const { Op, Sequelize } = require('sequelize');

// // Function to check bus availability based on from and to stops
// function isBusAvailable(from, to, routes) {
//   const fromIndex = routes.indexOf(from);
//   const toIndex = routes.indexOf(to);
 
//   // Check if both stops are in the route and 'from' stop comes before 'to' stop
//   return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
// }
 
// // Function to calculate total fare based on from and to stops
// function calculateTotalFare(from, to, route) {
//   const fromIndex = route.busRoute.indexOf(from);
//   const toIndex = route.busRoute.indexOf(to);
 
//   if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
//     let totalFare = 0;
//     for (let i = fromIndex; i < toIndex; i++) {
//       totalFare += route.busRouteFares[i];
//     }
//     return totalFare;
//   } else {
//     return null; // Handle error case where from or to stops are not found in the route
//   }
// }
 
// // Get all bus records or search buses by query parameters
// const getAllBuses = async (req, res) => {
//   const { from, to, date } = req.query;
 
//   try {
//     let buses;
 
//     // Fetch buses based on date and route availability
//     if (date && from && to) {
//       buses = await Bus.findAll({
//         include: [
//           {
//             model: Availability,
//             where: {
//               datesAvailable: { [Op.contains]: [date] }
//             }
//           },
//           Route,
//           Facility,
//           Review
//         ]
//       });
 
//       // Filter buses further based on route availability and calculate fare
//       buses = buses.filter(bus => {
//         if (bus.Route && isBusAvailable(from, to, bus.Route.busRoute)) {
//           bus.dataValues.totalFare = calculateTotalFare(from, to, bus.Route); // Calculate and add total fare
//           return true;
//         } else {
//           return false;
//         }
//       });
//     } else {
//       // Fetch all buses without date and route filtering
//       buses = await Bus.findAll({
//         include: [Route, Facility, Review, Availability]
//       });
//     }
 
//     res.status(200).json(buses);
//   } catch (error) {
//     console.error('Error fetching buses:', error);
//     res.status(500).json({ error: 'Error fetching bus records' });
//   }
// };
 
// // Function to get a single bus record by ID
// const getBusById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bus = await Bus.findByPk(id, {
//       include: [Route, Facility, Review, Availability]
//     });
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }
//     res.status(200).json(bus);
//   } catch (error) {
//     console.error('Error fetching bus by ID:', error);
//     res.status(500).json({ error: 'Error fetching bus record' });
//   }
// };
 
// // Function to create a new bus record
// const createBus = async (req, res) => {
//   const {
//     busName,
//     busNumber,
//     capacity,
//     busType,
//     numberOfSeats,
//     contactNumber,
//     fare,
//     from,
//     to,
//     busRoute,
//     busRouteTimes,
//     busRouteFares,
//     runsOnDays,
//     departure,
//     arrival,
//     facilities,
//     reviews,
//     datesAvailable
//   } = req.body;
 
//   try {
//     // Check if required fields are present in the request body
//     if (!busName || !busNumber || !capacity || !busType || !numberOfSeats) {
//       return res.status(400).json({ error: 'busName, busNumber, capacity, busType, and numberOfSeats are required fields' });
//     }
 
//     // Proceed with creating the new bus record
//     const newBus = await Bus.create({
//       busName,
//       busNumber,
//       capacity,
//       busType,
//       numberOfSeats,
//       contactNumber,
//       fare
//     });
 
//     const route = await Route.create({
//       busId: newBus.busId,
//       from,
//       to,
//       busRoute,
//       busRouteTimes,
//       busRouteFares,
//       runsOnDays,
//       departure,
//       arrival
//     });
 
//     const facility = await Facility.create({
//       busId: newBus.busId,
//       facilities
//     });
 
//     const review = await Review.create({
//       busId: newBus.busId,
//       reviews
//     });
 
//     const availability = await Availability.create({
//       busId: newBus.busId,
//       datesAvailable
//     });
 
//     res.status(201).json({ bus: newBus, route, facility, review, availability });
//   } catch (error) {
//     console.error('Error creating bus record:', error);
//     res.status(500).json({ error: 'Error creating bus record' });
//   }
// };
 
// // Function to update a bus record by ID
// const updateBusById = async (req, res) => {
//   const { id } = req.params;
//   const {
//     busName,
//     busNumber,
//     capacity,
//     busType,
//     numberOfSeats,
//     contactNumber,
//     fare,
//     from,
//     to,
//     busRoute,
//     busRouteTimes,
//     busRouteFares,
//     runsOnDays,
//     departure,
//     arrival,
//     facilities,
//     reviews,
//     datesAvailable
//   } = req.body;
 
//   try {
//     const bus = await Bus.findByPk(id);
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }
 
//     await bus.update({
//       busName,
//       busNumber,
//       capacity,
//       busType,
//       numberOfSeats,
//       contactNumber,
//       fare
//     });
 
//     await Route.update({
//       from,
//       to,
//       busRoute,
//       busRouteTimes,
//       busRouteFares,
//       runsOnDays,
//       departure,
//       arrival
//     }, { where: { busId: id } });
 
//     await Facility.update({
//       facilities
//     }, { where: { busId: id } });
 
//     await Review.update({
//       reviews
//     }, { where: { busId: id } });
 
//     await Availability.update({
//       datesAvailable
//     }, { where: { busId: id } });
 
//     res.status(200).json({ message: 'Bus updated successfully', bus });
//   } catch (error) {
//     console.error('Error updating bus by ID:', error);
//     res.status(500).json({ error: 'Error updating bus record' });
//   }
// };
 
// // Function to delete a bus record by ID
// const deleteBusById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const bus = await Bus.findByPk(id);
//     if (!bus) {
//       return res.status(404).json({ error: 'Bus not found' });
//     }
 
//     await Route.destroy({ where: { busId: id } });
//     await Facility.destroy({ where: { busId: id } });
//     await Review.destroy({ where: { busId: id } });
//     await Availability.destroy({ where: { busId: id } });
//     await bus.destroy();
 
//     res.status(200).json({ message: 'Bus deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting bus by ID:', error);
//     res.status(500).json({ error: 'Error deleting bus record' });
//   }
// };
 
// module.exports = {
//   getAllBuses,
//   getBusById,
//   createBus,
//   updateBusById,
//   deleteBusById
// };
 
const { Bus, BusRoute, BusFacility, BusReview } = require('../db/bus');
const { Op } = require('sequelize');

function isBusAvailable(from, to, bus) {
  const fromIndex = bus.indexOf(from);
  const toIndex = bus.indexOf(to);

  // Check if both stops are in the route and 'from' stop comes before 'to' stop
  return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
}

// Create a new bus record
const createBus = async (req, res) => {
  const {
    busName,
    busNo,
    capacity,
    busType,
    numberOfSeats,
    from,
    to,
    busRoute,
    busRouteTimes,
    departure,
    arrival,
    facilities,
    price,
    reviews,
    datesAvailable
  } = req.body;

  try {
    if (!busName || !busNo || !capacity || !busType || !numberOfSeats) {
      return res.status(400).json({ error: 'busName, busNo, capacity, busType, and numberOfSeats are required fields' });
    }

    const newBus = await Bus.create({
      busName,
      busNo,
      capacity,
      busType,
      numberOfSeats,
      from,
      to,
      departure,
      arrival,
      price,
      datesAvailable
    });

    if (busRoute && busRouteTimes) {
      for (let i = 0; i < busRoute.length; i++) {
        await BusRoute.create({
          busId: newBus.busId,
          route: busRoute[i],
          routeTime: busRouteTimes[i]
        });
      }
    }

    if (facilities) {
      for (let facility of facilities) {
        await BusFacility.create({
          busId: newBus.busId,
          facility
        });
      }
    }

    if (reviews) {
      for (let review of reviews) {
        await BusReview.create({
          busId: newBus.busId,
          review
        });
      }
    }

    res.status(201).json(newBus);
  } catch (error) {
    console.error('Error creating bus record:', error);
    res.status(500).json({ error: 'Error creating bus record' });
  }
};

// Get all bus records or search buses by query parameters
const getAllBuses = async (req, res) => {
  const { from, to, date } = req.query;

  try {
    let buses;

    // Fetch buses based on date and route availability
    if (date && from && to) {
      buses = await Bus.findAll({
        include: [
          { model: BusRoute, as: 'routes' },
          { model: BusFacility, as: 'facilities' },
          { model: BusReview, as: 'reviews' }
        ],
        where: {
          datesAvailable: {
            [Op.contains]: [date]
          }
        }
      });

      // Filter buses further based on route availability and calculate fare
      buses = buses.filter(bus => {
        if (bus && isBusAvailable(from, to, bus.busRoute)) {
          // Calculate and add total fare (if needed)
          // bus.dataValues.totalFare = calculateTotalFare(from, to, bus.busRoute);
          return true;
        } else {
          return false;
        }
      });
    } else {
      // Fetch all buses without date and route filtering
      buses = await Bus.findAll({
        include: [
          { model: BusRoute, as: 'routes' },
          { model: BusFacility, as: 'facilities' },
          { model: BusReview, as: 'reviews' }
        ]
      });
    }

    res.status(200).json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ error: 'Error fetching bus records' });
  }
};

// Update a bus record by ID
const updateBusById = async (req, res) => {
  const { id } = req.params;
  const {
    busName,
    busNo,
    capacity,
    busType,
    numberOfSeats,
    from,
    to,
    busRoute,
    busRouteTimes,
    departure,
    arrival,
    facilities,
    price,
    reviews,
    datesAvailable
  } = req.body;

  try {
    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }

    await bus.update({
      busName,
      busNo,
      capacity,
      busType,
      numberOfSeats,
      from,
      to,
      departure,
      arrival,
      price,
      datesAvailable
    });

    await BusRoute.destroy({ where: { busId: bus.busId } });
    if (busRoute && busRouteTimes) {
      for (let i = 0; i < busRoute.length; i++) {
        await BusRoute.create({
          busId: bus.busId,
          route: busRoute[i],
          routeTime: busRouteTimes[i]
        });
      }
    }

    await BusFacility.destroy({ where: { busId: bus.busId } });
    if (facilities) {
      for (let facility of facilities) {
        await BusFacility.create({
          busId: bus.busId,
          facility
        });
      }
    }

    await BusReview.destroy({ where: { busId: bus.busId } });
    if (reviews) {
      for (let review of reviews) {
        await BusReview.create({
          busId: bus.busId,
          review
        });
      }
    }

    res.status(200).json(bus);
  } catch (error) {
    console.error('Error updating bus record:', error);
    res.status(500).json({ error: 'Error updating bus record' });
  }
};

// Delete a bus record by ID
const deleteBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    await bus.destroy();
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bus record:', error);
    res.status(500).json({ error: 'Error deleting bus record' });
  }
};

// Get a bus record by ID
const getBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findByPk(id, {
      include: [
        { model: BusRoute, as: 'routes' },
        { model: BusFacility, as: 'facilities' },
        { model: BusReview, as: 'reviews' }
      ]
    });
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.status(200).json(bus);
  } catch (error) {
    console.error('Error fetching bus by ID:', error);
    res.status(500).json({ error: 'Error fetching bus record' });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById
};
