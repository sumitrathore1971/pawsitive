import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import User from "../models/User.js";

const router = Router();

// List only approved caregivers for booking.
router.get("/verified", authMiddleware, allowRoles("PetOwner"), async (req, res) => {
  try {
    const caregivers = await User.find({ role: "Caregiver", isVerified: true }).select(
      "_id name phone address experience idProof"
    );
    return res.json({ caregivers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

