const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for reservation actions
router.post('/new', reservationController.createReservation);
router.delete('/:id', reservationController.cancelReservation);

// Route for rendering reservations page
router.get('/', async (req, res) => {
  try {
    const reservations = await reservationController.getReservationsByUser(req, res);
    res.render('reservations/index', { reservations });
  } catch (error) {
    res.status(500).send('Error retrieving reservations');
  }
});

// Route for rendering new reservation form
router.get('/new', async (req, res) => {
  try {
    const rooms = await roomController.getAllRooms();
    res.render('reservations/new', { rooms });
  } catch (error) {
    res.status(500).send('Error retrieving rooms');
  }
});

module.exports = router;
