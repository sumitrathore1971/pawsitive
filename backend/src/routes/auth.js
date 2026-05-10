import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
console.log('Auth router created');

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const payload = { id: user._id.toString(), name: user.name, role: user.role };
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function normalizeRoleInput(role) {
  const raw = String(role || '').trim();
  const compact = raw.replace(/\s+/g, '').toLowerCase();

  if (compact === 'petowner') return 'PetOwner';
  if (compact === 'caregiver') return 'Caregiver';
  if (compact === 'admin') return 'Admin';
  return raw;
}

function normalizeEmailInput(email) {
  return String(email || '').trim().toLowerCase();
}

router.post('/signup', async (req, res) => {
  try {
    
    
    const { name, email, password, role, phone, address, experience, idProof } = req.body;
    const normalizedEmail = normalizeEmailInput(email);
    const normalizedRole = normalizeRoleInput(role);

    if (!name || !normalizedEmail || !password || !normalizedRole) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const validRoles = ['PetOwner', 'Caregiver', 'Admin'];

    if (!validRoles.includes(normalizedRole)) {
      return res.status(400).json({
        message: 'Invalid role. Allowed: PetOwner, Caregiver, Admin',
      });
    }

    // Role-specific required fields for caregivers.
    if (normalizedRole === 'Caregiver') {
      if (!phone || !address || !experience || !idProof) {
        return res.status(400).json({ message: 'Missing caregiver fields' });
      }
    }

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hash,
      role: normalizedRole,
      phone: normalizedRole === 'Caregiver' ? phone : undefined,
      address: normalizedRole === 'Caregiver' ? address : undefined,
      experience: normalizedRole === 'Caregiver' ? experience : undefined,
      idProof: normalizedRole === 'Caregiver' ? idProof : undefined,
      // Caregivers start unverified; admins can approve later.
      isVerified: normalizedRole === 'Caregiver' ? false : true,
    });
    const token = signToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmailInput(email);
    if (!normalizedEmail || !password) return res.status(400).json({ message: 'Missing credentials' });

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const allowedRoles = ['PetOwner', 'Caregiver', 'Admin'];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'This account role is no longer supported. Please contact admin.',
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    console.log('Change password route called');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ message: 'New password is required' });
    if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long' });

    // Hash the new password
    const hash = await bcrypt.hash(newPassword, 10);
    console.log('Password hashed successfully');
    
    // Update the user's password in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: hash },
      { new: true }
    ).select('_id name email role createdAt');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    console.log('Password updated successfully for user:', updatedUser._id);

    return res.json({ 
      message: 'Password changed successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Error in change-password route:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    console.log('Profile update route called');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);
    
    const { name, email, phone, address } = req.body;
    
    // Validate required fields
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
    
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existingUser) return res.status(409).json({ message: 'Email is already taken by another user' });

    // Update the user's profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, address },
      { new: true }
    ).select('_id name email role createdAt phone address');

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    console.log('Profile updated successfully for user:', updatedUser._id);

    return res.json({ 
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Error in profile update route:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      '_id name email role createdAt phone address experience idProof isVerified'
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

console.log('Auth routes defined:', router.stack.length, 'routes');
export default router;
