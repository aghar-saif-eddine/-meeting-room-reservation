const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

exports.createReservation = async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.body;
    const conflictingReservation = await Reservation.findOne({
      room: roomId,
      $or: [
        { startTime: { $lt: endTime, $gt: startTime } },
        { endTime: { $lt: endTime, $gt: startTime } }
      ]
    });
    if (conflictingReservation) {
      return res.status(400).send({ message: 'Time slot is already booked' });
    }
    const reservation = new Reservation({
      user: "666b68e707cab2c052c02e0b",
      // user: req.user.userId,
      room: roomId,
      startTime,
      endTime,
    });
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getReservationsByUser = async (req, res) => {
  try {
    // const reservations = await Reservation.find({ user: req.user.userId });
    const reservations = await Reservation.find().populate('room');

    return reservations; 
  } catch (error) {
    throw new Error('Error fetching reservations');
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send({ message: 'Reservation not found' });
    }
    if (reservation.user.toString() !== req.user.userId) {
      return res.status(403).send({ message: 'You can only cancel your own reservations' });
    }
    await reservation.remove();
    res.send({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(400).send(error);
  }
};
