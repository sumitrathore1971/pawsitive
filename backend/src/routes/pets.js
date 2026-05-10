import { Router } from "express";
import mongoose from "mongoose";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import Pet from "../models/Pet.js";

const router = Router();

// Create a pet linked to the authenticated owner.
router.post("/", authMiddleware, allowRoles("PetOwner"), async (req, res) => {
  try {
    const { name, type, age, breed, allergies, specialInstructions } = req.body;

    if (!name || age === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ownerId = req.user.id;
    if (!mongoose.isValidObjectId(ownerId)) {
      return res.status(400).json({ message: "Invalid owner id" });
    }

    const pet = await Pet.create({
      ownerId,
      name,
      type,
      age,
      breed,
      allergies,
      specialInstructions,
    });

    return res.status(201).json({ pet });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Fetch pets owned by the authenticated owner.
router.get("/mine", authMiddleware, allowRoles("PetOwner"), async (req, res) => {
  try {
    const ownerId = req.user.id;
    const pets = await Pet.find({ ownerId }).sort({ createdAt: -1 });
    return res.json({ pets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

