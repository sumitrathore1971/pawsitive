import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceType: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, required: true },

    status: {
      type: String,
      enum: ["Incoming", "Accepted", "Rejected", "Arrived", "Completed"],
      default: "Incoming",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

