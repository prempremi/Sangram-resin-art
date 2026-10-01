import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showAdminKeyField, setShowAdminKeyField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Login failed. Please check your email and password.');
        }
      } else {
        const res = await signup(name, email, password, adminKey.trim() || undefined);
        if (!res.success) {
          setError(res.error || 'Signup failed. Please check your information and try again.');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#0A192F] p-6 text-white border-b border-[#1E3A5F] relative">
          <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-[#D4AF37] via-[#EA580C] to-[#D4AF37]" />
          
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#112240] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Secure Authentication</span>
          </div>

          <h3 className="font-heading text-xl font-bold text-white">
            {authModalMode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {authModalMode === 'login' 
              ? 'Enter your credentials to access your customer inquiries or admin dashboard.'
              : 'Sign up to submit custom resin art requests, track project proofs, and manage orders.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="mt-4 flex rounded-lg bg-[#112240] p-1 border border-[#1E3A5F]">
            <button
              type="button"
              onClick={() => { setError(null); openAuthModal('login'); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                authModalMode === 'login'
                  ? 'bg-[#D4AF37] text-[#0A192F] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setError(null); openAuthModal('signup'); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                authModalMode === 'signup'
                  ? 'bg-[#D4AF37] text-[#0A192F] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                <span className="text-[10px] text-slate-400">Min. 6 characters</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Optional Admin Key Toggle for Signup */}
            {authModalMode === 'signup' && (
              <div className="pt-1">
                {!showAdminKeyField ? (
                  <button
                    type="button"
                    onClick={() => setShowAdminKeyField(true)}
                    className="text-[11px] font-semibold text-[#B89628] hover:text-[#0A192F] flex items-center gap-1 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Have an Admin Registration Key?</span>
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#0A192F] uppercase tracking-wide">
                        Admin Secret Key
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdminKeyField(false);
                          setAdminKey('');
                        }}
                        className="text-[10px] text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                    <input
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter administrator passkey"
                      className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                    <p className="mt-1 text-[10px] text-slate-500">
                      Enter the studio manager key to register with administrator privileges.
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-[#0A192F] hover:bg-[#112240] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>

          {/* Privacy & Security Note */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Protected by encrypted session authentication. Public browsing and offline inquiries do not require sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
