import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import Booking from "./models/Booking.js";
import authRoutes from "./routes/auth.js";
import petsRoutes from "./routes/pets.js";
import caregiversRoutes from "./routes/caregivers.js";
import bookingsRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pawsitive_local";
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
app.use("/api/pets", petsRoutes);
app.use("/api/caregivers", caregiversRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/admin", adminRoutes);

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

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: [
          FRONTEND_URL,
          "http://localhost:3000",
          "http://localhost:5173",
          "http://localhost:5174",
        ],
        credentials: true,
      },
    });

    // Make the socket instance available to routes via req.app.locals.io.
    app.locals.io = io;

    // JWT-authenticated sockets.
    io.use((socket, next) => {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      try {
        const payload = jwt.verify(token, JWT_SECRET);
        socket.user = payload; // { id, name, role }
        next();
      } catch (_e) {
        return next(new Error("Unauthorized"));
      }
    });

    io.on("connection", (socket) => {
      const userId = socket.user?.id;
      if (userId) {
        socket.join(`user:${userId}`);
      }

      // Caregiver location forwarding to the booking's owner.
      socket.on("caregiverLocation", async (payload) => {
        try {
          const { bookingId, lat, lng } = payload || {};
          if (!bookingId || lat == null || lng == null) return;

          const booking = await Booking.findById(bookingId).select(
            "ownerId caregiverId"
          );
          if (!booking) return;

          const ownerId = booking.ownerId?.toString();
          if (!ownerId) return;

          io.to(`user:${ownerId}`).emit("caregiverLocation", {
            bookingId,
            lat,
            lng,
            caregiverId: booking.caregiverId?.toString(),
          });
        } catch (_e) {
          // Ignore location errors to avoid breaking the socket.
        }
      });
    });

    httpServer.listen(PORT, () => {
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
