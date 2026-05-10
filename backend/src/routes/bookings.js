import { Router } from "express";
import mongoose from "mongoose";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = Router();

async function getBookingById(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  return Booking.findById(id).populate("caregiverId", "name phone address experience isVerified role");
}

// Owner creates a booking (status: Incoming).
router.post("/", authMiddleware, allowRoles("PetOwner"), async (req, res) => {
  try {
    const { caregiverId, serviceType, scheduledAt } = req.body;

    if (!caregiverId || !serviceType || !scheduledAt) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.isValidObjectId(caregiverId)) {
      return res.status(400).json({ message: "Invalid caregiverId" });
    }

    const scheduledDate = new Date(scheduledAt);
    if (Number.isNaN(scheduledDate.getTime())) {
      return res.status(400).json({ message: "Invalid scheduledAt" });
    }

    const caregiver = await User.findById(caregiverId).select("role isVerified");
    if (!caregiver || caregiver.role !== "Caregiver" || !caregiver.isVerified) {
      return res.status(403).json({ message: "Caregiver is not verified" });
    }

    const booking = await Booking.create({
      ownerId: req.user.id,
      caregiverId,
      serviceType,
      scheduledAt: scheduledDate,
      status: "Incoming",
    });

    const io = req.app.locals.io;
    if (io) {
      io.to(`user:${caregiverId}`).emit("BookingConfirmed", {
        bookingId: booking._id.toString(),
        booking,
      });
    }

    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// List bookings for the authenticated user (owner or caregiver).
router.get("/mine", authMiddleware, allowRoles("PetOwner", "Caregiver"), async (req, res) => {
  try {
    const role = req.user.role;

    const query =
      role === "PetOwner"
        ? { ownerId: req.user.id }
        : { caregiverId: req.user.id };

    const bookings = await Booking.find(query)
      .populate("caregiverId", "name phone address experience isVerified")
      .populate("ownerId", "name email");

    return res.json({ bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Caregiver transitions.
router.post("/:id/accept", authMiddleware, allowRoles("Caregiver"), async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id).select("isVerified role");
    if (!caregiver || caregiver.role !== "Caregiver" || !caregiver.isVerified) {
      return res.status(403).json({ message: "Caregiver is not verified" });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (booking.status !== "Incoming") {
      return res.status(400).json({ message: "Booking cannot be accepted in its current state" });
    }

    booking.status = "Accepted";
    await booking.save();

    const io = req.app.locals.io;
    if (io) {
      io.to(`user:${booking.ownerId.toString()}`).emit("CaregiverAssigned", {
        bookingId: booking._id.toString(),
        booking,
      });
    }

    return res.json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/reject", authMiddleware, allowRoles("Caregiver"), async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id).select("isVerified role");
    if (!caregiver || caregiver.role !== "Caregiver" || !caregiver.isVerified) {
      return res.status(403).json({ message: "Caregiver is not verified" });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (booking.status !== "Incoming") {
      return res.status(400).json({ message: "Booking cannot be rejected in its current state" });
    }

    booking.status = "Rejected";
    await booking.save();

    return res.json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/arrived", authMiddleware, allowRoles("Caregiver"), async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id).select("isVerified role");
    if (!caregiver || caregiver.role !== "Caregiver" || !caregiver.isVerified) {
      return res.status(403).json({ message: "Caregiver is not verified" });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (booking.status !== "Accepted") {
      return res.status(400).json({ message: "Booking cannot be marked arrived in its current state" });
    }

    booking.status = "Arrived";
    await booking.save();

    const io = req.app.locals.io;
    if (io) {
      io.to(`user:${booking.ownerId.toString()}`).emit("CaregiverArrived", {
        bookingId: booking._id.toString(),
        booking,
      });
    }

    return res.json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/complete", authMiddleware, allowRoles("Caregiver"), async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id).select("isVerified role");
    if (!caregiver || caregiver.role !== "Caregiver" || !caregiver.isVerified) {
      return res.status(403).json({ message: "Caregiver is not verified" });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (booking.status !== "Arrived") {
      return res.status(400).json({ message: "Booking cannot be completed in its current state" });
    }

    booking.status = "Completed";
    await booking.save();

    const io = req.app.locals.io;
    if (io) {
      io.to(`user:${booking.ownerId.toString()}`).emit("ServiceCompleted", {
        bookingId: booking._id.toString(),
        booking,
      });
    }

    return res.json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

