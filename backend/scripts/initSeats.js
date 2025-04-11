const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function initializeSeats() {
  try {
    // First, delete any existing seats
    console.log('Clearing existing seats...');
    await prisma.seat.deleteMany({});
    
    console.log('Creating new seats...');
    
    // Define seat layout
    const totalRows = 12;
    const seatsPerRow = 7;
    const seatsToCreate = [];
    
    // Create exactly 80 seats with last row having fewer seats
    let count = 0;
    for (let row = 1; row <= totalRows; row++) {
      // Calculate how many seats to put in this row
      // Last row will only have 3 seats to make total exactly 80
      const rowSeats = row === totalRows ? 80 - (totalRows - 1) * seatsPerRow : seatsPerRow;
      
      for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
        count++;
        seatsToCreate.push({
          seatNumber: count,
          rowNumber: row,
          isBooked: false,
          userId: null
        });
      }
    }
    
    // Insert all seats in a single transaction
    await prisma.seat.createMany({
      data: seatsToCreate
    });
    
    console.log(`Successfully created ${seatsToCreate.length} seats.`);
  } catch (error) {
    console.error('Error initializing seats:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeSeats();