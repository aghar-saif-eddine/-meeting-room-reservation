const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    return rooms; // Return the rooms instead of sending a response
  } catch (error) {
    throw new Error('Error fetching rooms'); // Throw an error to be caught by the router
  }
};


// Add a new room
exports.addNewRoom = async (req, res) => {
  try {
    const { name, capacity, equipment } = req.body;
    const room = new Room({ name, capacity, equipment: equipment.split(',').map(item => item.trim()) });
    await room.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).send(error);
  }
};
