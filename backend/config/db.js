const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const connectionDB = async () => {
  try {
    console.log("Connecting to database...");
    await prisma.$connect();
    
    // Test the connection
    const result = await prisma.$queryRaw`SELECT 1 as connection_test`;
    console.log("Database connection verified:", result);
    
  } catch (error) {
    console.error("Database connection failed!");
    console.error("Error details:", error);
    console.error("Check your DATABASE_URL in the .env file");
    process.exit(1);
  }
};

module.exports = { connectionDB, prisma };