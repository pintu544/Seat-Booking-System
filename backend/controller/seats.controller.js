const { Seat } = require('../models/seats.model');

const bookingController = async (req, res) => {
  const { numOfSeats } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (numOfSeats > 7) {
    return res.status(400).json({ message: 'Not able to book more than 7 seats' });
  }

  try {
    const availableSeats = await Seat.find({ isBooked: false });

    availableSeats.sort((a, b) =>
      a.rowNumber === b.rowNumber ?
      a.seatNumber - b.seatNumber :
      a.rowNumber - b.rowNumber
    );

    if (availableSeats.length < numOfSeats) {
      return res.status(500).json({ message: `Opps Booking failed, No seats available to book.` });
    }

    const rowCount = 12;

    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = availableSeats.filter(seat => seat.rowNumber === row && !seat.isBooked);

      if (rowSeats.length >= numOfSeats) {
        const availableToBook = rowSeats.slice(0, numOfSeats);
        const bookedSeats = [];

        for (const seat of availableToBook) {
          const updatedSeat = await Seat.update(seat.id, true, req.user.id);
          bookedSeats.push(updatedSeat);
        }

        return res.status(200).json({ data: bookedSeats });
      }
    }

    // Finding seats across multiple rows if needed
    let arr = [];
    for (let row = 1; row <= rowCount; row++) {
      const rowSeats = availableSeats.filter(seat => seat.rowNumber === row && !seat.isBooked);
      arr.push(rowSeats.length);
    }

    let minLength = Infinity;
    let minStart = -1;
    let minEnd = -1;
    let start = 0;
    let end = 0;
    let sum = 0;

    while (end < arr.length) {
      sum += arr[end];

      while (sum >= numOfSeats) {
        let length = end - start + 1;
        if (length < minLength) {
          minLength = length;
          minStart = start;
          minEnd = end;
        }
        sum -= arr[start];
        start++;
      }
      end++;
    }

    let finalArray = [];
    for (let row = minStart + 1; row <= minEnd + 1; row++) {
      availableSeats.filter(seat => {
        if (seat.rowNumber === row && !seat.isBooked) finalArray.push(seat);
      });
    }
    finalArray = finalArray.slice(0, numOfSeats);

    const seatIds = finalArray.map(seat => seat.id);
    const bookedSeats = await Seat.updateMany(seatIds, true, req.user.id);
    if (bookedSeats.length > 0) {
      return res.status(200).json({ data: bookedSeats });
    }

    return res.status(500).json({ message: 'Booking failed' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const resetSeatsController = async (req, res) => {
  try {
    await Seat.deleteMany();

    const totalRows = 12;
    const seatsPerRow = 7;
    const seats = [];

    let count = 0;
    for (let row = 1; row <= totalRows; row++) {
      const rowSeats = row === totalRows ? 80 % seatsPerRow : seatsPerRow;
      for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
        count++;
        seats.push({
          seatNumber: count,
          rowNumber: row,
          isBooked: false,
        });
      }
    }

    await Seat.insertMany(seats);
    return res.json({ message: 'data successfully reset' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// New controller for users to reset their own bookings
const resetUserBookingsController = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const result = await Seat.resetUserSeats(req.user.id);
    
    if (result.count === 0) {
      return res.status(404).json({ 
        message: 'No seats to reset',
        count: 0
      });
    }
    
    return res.status(200).json({ 
      message: 'Your bookings have been reset',
      count: result.count
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    return res.status(200).json({ availableSeats: seats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { 
  bookingController, 
  resetSeatsController, 
  resetUserBookingsController,
  getSeats 
};