import { Router } from "express";
import mongoose from "mongoose";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import User from "../models/User.js";

const router = Router();

router.get("/caregivers", authMiddleware, allowRoles("Admin"), async (req, res) => {
  try {
    const caregivers = await User.find({ role: "Caregiver" }).select(
      "_id name phone address experience idProof isVerified"
    );
    return res.json({ caregivers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/caregivers/:id/approve",
  authMiddleware,
  allowRoles("Admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid caregiver id" });
      }

      const updated = await User.findByIdAndUpdate(
        id,
        { isVerified: true },
        { new: true }
      ).select("_id name phone address experience idProof isVerified role");

      if (!updated) return res.status(404).json({ message: "Caregiver not found" });
      if (updated.role !== "Caregiver") {
        return res.status(400).json({ message: "User is not a caregiver" });
      }

      return res.json({ caregiver: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/caregivers/:id/reject",
  authMiddleware,
  allowRoles("Admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid caregiver id" });
      }

      const updated = await User.findByIdAndUpdate(
        id,
        { isVerified: false },
        { new: true }
      ).select("_id name phone address experience idProof isVerified role");

      if (!updated) return res.status(404).json({ message: "Caregiver not found" });
      if (updated.role !== "Caregiver") {
        return res.status(400).json({ message: "User is not a caregiver" });
      }

      return res.json({ caregiver: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;

