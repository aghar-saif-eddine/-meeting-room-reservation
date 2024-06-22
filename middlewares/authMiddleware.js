const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZjNzYzNGU5MGE4OGYwMWQ3Mjc1MTciLCJpYXQiOjE3MTgzODU2NDV9.s2uicP7M5NE6l40Ywh8fvOLowYpWUf1ZxC2t6riK44Q";
  if (!token) {
    return res.status(401).send({ message: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
