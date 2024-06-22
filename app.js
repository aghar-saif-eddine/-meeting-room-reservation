const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservations');
const app = express();

mongoose.connect('mongodb://localhost/meeting-room-reservation', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route to render the home page
app.get('/', (req, res) => {
  res.render('index');
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.render('auth/login');
});

// Route to render the registration page
app.get('/register', (req, res) => {
  res.render('auth/register');
});

app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
