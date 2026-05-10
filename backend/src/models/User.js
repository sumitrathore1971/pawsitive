import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['PetOwner', 'Caregiver', 'Admin'],
      required: true,
    },
    // Used only for caregivers; default false until admin approval.
    isVerified: { type: Boolean, default: false },

    // Caregiver profile fields
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    experience: { type: String, trim: true },
    // Store uploaded file "name" (or path) for now.
    idProof: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
