import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import AuthNavbar from '@/components/AuthNavbar';

const roles = [
  { label: 'Pet Owner', value: 'PetOwner' },
  { label: 'Caregiver', value: 'Caregiver' },
];

function normalizeRoleForApi(role) {
  const value = String(role || '').trim().replace(/\s+/g, '').toLowerCase();
  if (value === 'petowner') return 'PetOwner';
  if (value === 'caregiver') return 'Caregiver';
  if (value === 'admin') return 'Admin';
  return role;
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('PetOwner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [idProofFile, setIdProofFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate(); 

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const normalizedRole = normalizeRoleForApi(role);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (normalizedRole === 'Caregiver') {
      const missing = [];
      if (!phone) missing.push('phone');
      if (!address) missing.push('address');
      if (!experience) missing.push('experience');
      if (!idProofFile) missing.push('id proof');
      if (missing.length) {
        setError(`Missing caregiver fields: ${missing.join(', ')}`);
        return;
      }
    }
    setLoading(true);
    try {
      const redirect = await signup({
        name,
        email,
        password,
        role: normalizedRole,
        phone: normalizedRole === 'Caregiver' ? phone : undefined,
        address: normalizedRole === 'Caregiver' ? address : undefined,
        experience: normalizedRole === 'Caregiver' ? experience : undefined,
        idProof: normalizedRole === 'Caregiver' ? idProofFile?.name : undefined,
      });
      navigate(redirect, { replace: true });
    } catch (e) {
      setError(e?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-17">
      <AuthNavbar />
      <div className="pt-20 grid place-items-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Create account</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Sign up to access your dashboard</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" placeholder="Rahul Sharma" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2">
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            {role === 'Caregiver' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
                    placeholder="City, Area, Street"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
                  <input
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
                    placeholder="Years of experience (text)"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID Proof (mock upload)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
                    className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2"
                    required
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    We will store the file name as proof (mock).
                  </p>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" placeholder="••••••••" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2" placeholder="••••••••" required />
            </div>
            {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
            <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link className="text-primary" to="/login">Log in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
