import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bhunirakshak";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

// Set JWT_SECRET globally for the auth routes
process.env.JWT_SECRET = JWT_SECRET;

app.use(
  cors({
    origin: [
      FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    name: "Bhu-Nirakshak API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log(`Frontend URL: ${FRONTEND_URL}`);
      console.log(`API base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
