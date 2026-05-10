import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../src/models/User.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pawsitive_local";

const ADMIN_NAME = process.env.ADMIN_NAME || "System Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pawsitive.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin12345";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existing) {
      existing.name = ADMIN_NAME;
      existing.password = passwordHash;
      existing.role = "Admin";
      existing.isVerified = true;
      await existing.save();
      console.log(`Updated existing user as Admin: ${ADMIN_EMAIL}`);
    } else {
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: passwordHash,
        role: "Admin",
        isVerified: true,
      });
      console.log(`Created Admin user: ${ADMIN_EMAIL}`);
    }

    console.log("Admin seeding complete.");
  } catch (error) {
    console.error("Failed to seed admin user:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();

