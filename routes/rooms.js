const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Route to handle the form submission to add a new room
router.post('/new', roomController.addNewRoom);


router.get('/', async (req, res) => {
  try {
    const rooms = await roomController.getAllRooms();
    res.render('rooms/index', { rooms }); // Pass the resulting array to the view
  } catch (error) {
    res.status(500).send('Error retrieving rooms');
  }
});

// Display form to add a new room
router.get('/new', (req, res) => {
    res.render('rooms/newRoom');
  });

module.exports = router;
    