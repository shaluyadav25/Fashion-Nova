import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5001;

app.use(express.json());

app.get("/health", (_req, res) => {
  const databaseStates = ["disconnected", "connected", "connecting", "disconnecting"];
  res.status(200).json({
    status: "ok",
    database: databaseStates[mongoose.connection.readyState] || "unknown",
  });
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(error.message);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();