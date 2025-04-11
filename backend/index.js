const express = require("express");
const { connectionDB } = require("./config/db");
const seatsRoutes = require("./routes/seats.routes");
const authRoutes = require("./routes/auth.routes");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
app.use(cors(process.env.FRONTEND_URL));
dotenv.config();

const startServer = async () => {
  await connectionDB();

  app.use(express.json());

  app.get("/", (req, res) => {
    console.log("unstop assignment");
    res.send("Server is running");
  });

  // Add authentication routes
  app.use("/api/auth", authRoutes);
  
  // Existing seats routes
  app.use("/api/seats", seatsRoutes);

  const port = process.env.PORT || 8080;
  app.listen(port, () => { console.log("server running at port = ", port) });
};

startServer();