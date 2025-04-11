const { prisma } = require('../config/db');

const Seat = {
  find: async (filter = {}) => {
    try {
      const where = {};
      if (filter.isBooked !== undefined) {
        where.isBooked = filter.isBooked;
      }
      if (filter.userId !== undefined) {
        where.userId = filter.userId;
      }
      return await prisma.seat.findMany({
        where,
        orderBy: [
          { rowNumber: 'asc' },
          { seatNumber: 'asc' }
        ],
        include: {
          user: {
            select: {
              id: true,
              email: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error finding seats:', error);
      throw error;
    }
  },

  findById: async (id) => {
    return await prisma.seat.findUnique({ where: { id } });
  },

  update: async (id, isBooked, userId = null) => {
    return await prisma.seat.update({
      where: { id },
      data: { 
        isBooked,
        userId: isBooked ? userId : null 
      }
    });
  },

  updateMany: async (ids, isBooked, userId = null) => {
    try {
      return await prisma.$transaction(
        ids.map(id => prisma.seat.update({
          where: { id },
          data: { 
            isBooked,
            userId: isBooked ? userId : null
          }
        }))
      );
    } catch (error) {
      console.error('Error updating seats:', error);
      throw error;
    }
  },
  
  resetUserSeats: async (userId) => {
    const result = await prisma.seat.updateMany({
      where: { userId: userId },
      data: { 
        isBooked: false,
        userId: null
      }
    });
    
    return { count: result.count };
  },

  deleteMany: async () => {
    await prisma.seat.deleteMany();
    return { acknowledged: true };
  },

  insertMany: async (seatsArray) => {
    await prisma.$transaction(
      seatsArray.map(seat => prisma.seat.create({
        data: {
          seatNumber: seat.seatNumber,
          rowNumber: seat.rowNumber,
          isBooked: seat.isBooked || false,
          userId: seat.userId || null
        }
      }))
    );
    return { acknowledged: true };
  }
};

module.exports = { Seat };