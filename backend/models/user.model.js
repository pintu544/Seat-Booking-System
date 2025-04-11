const { prisma } = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  findByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  findById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  create: async (userData) => {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    });
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = { User };