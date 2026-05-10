import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true, trim: true },
    type: { type: String, trim: true }, // Dog/Cat/etc (kept flexible)
    age: { type: Number, required: true },
    breed: { type: String, trim: true },
    allergies: { type: String, trim: true },
    specialInstructions: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);

