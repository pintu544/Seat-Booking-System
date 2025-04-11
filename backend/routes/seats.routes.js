const express = require('express');
const router = express.Router();
const { 
  bookingController, 
  resetSeatsController, 
  resetUserBookingsController,
  getSeats 
} = require('../controller/seats.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Reset all seats 
router.post('/', resetSeatsController);

// Initialize seats
router.post('/init', resetSeatsController);

// Get all seats
router.get('/', getSeats);

// Book seats (requires authentication)
router.post('/book', authMiddleware, bookingController);

// Reset user's bookings
router.post('/reset', authMiddleware, resetUserBookingsController);

module.exports = router;
