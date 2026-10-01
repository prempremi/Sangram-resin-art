import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Upload, 
  Eye, 
  EyeOff, 
  Trash2, 
  Users, 
  ArrowLeft, 
  LogOut, 
  Image as ImageIcon, 
  Clock, 
  Smartphone, 
  Monitor, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Lock,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnalyticsData, CustomGalleryItem, VisitEvent } from '../types/auth';
import { getAnalyticsData } from '../services/analyticsService';
import { 
  getAllGalleryPhotos, 
  uploadGalleryPhoto, 
  togglePhotoVisibility, 
  deleteGalleryPhoto 
} from '../services/galleryService';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { user, token, isAdmin, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'analytics' | 'gallery' | 'upload' | 'users'>('analytics');
  
  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Gallery state
  const [photos, setPhotos] = useState<CustomGalleryItem[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'private' | 'public'>('all');

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('resin');
  const [uploadCategoryLabel, setUploadCategoryLabel] = useState('Resin Art');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [uploadIsPrivate, setUploadIsPrivate] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Security Check: If non-admin, block access immediately
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-red-500/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-white">Access Restricted</h2>
          <p className="text-sm text-slate-300">
            The route <code className="bg-slate-700 px-1 py-0.5 rounded text-amber-300">/admin-dashboard</code> requires Administrator privileges. Non-admin accounts or unauthenticated visitors cannot access studio analytics or private galleries.
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToSite}
              className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] font-bold text-sm transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Load analytics and photos
  const fetchDashboardData = async () => {
    setLoadingAnalytics(true);
    setLoadingPhotos(true);
    try {
      const aData = await getAnalyticsData(token);
      setAnalytics(aData);

      const pData = await getAllGalleryPhotos(token);
      setPhotos(pData);
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
    } finally {
      setLoadingAnalytics(false);
      setLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Handle Photo File Pick
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setUploadError('Image size exceeds 8MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
        setUploadError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Upload Submit
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    setUploadSuccess(null);

    if (!uploadTitle.trim()) {
      setUploadError('Please provide a title for the photo.');
      return;
    }
    if (!uploadImage) {
      setUploadError('Please upload an image file or provide an image URL.');
      return;
    }

    setUploading(true);
    try {
      const created = await uploadGalleryPhoto(
        {
          title: uploadTitle.trim(),
          category: uploadCategory,
          categoryLabel: uploadCategoryLabel,
          image: uploadImage,
          caption: uploadCaption.trim() || 'Uploaded via Sangram Admin Portal',
          isPrivate: uploadIsPrivate
        },
        token
      );

      setPhotos([created, ...photos]);
      setUploadSuccess(
        uploadIsPrivate 
          ? 'Photo securely uploaded to Private Vault (Admin Only).' 
          : 'Photo uploaded and published directly to Public Gallery!'
      );
      // Reset form
      setUploadTitle('');
      setUploadCaption('');
      setUploadImage('');
    } catch {
      setUploadError('Failed to upload photo. Please check image data.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Toggle Visibility (Private <-> Public)
  const handleToggleVisibility = async (photo: CustomGalleryItem) => {
    const newIsPrivate = !photo.isPrivate;
    await togglePhotoVisibility(photo.id, newIsPrivate, token);
    setPhotos(photos.map((p) => (p.id === photo.id ? { ...p, isPrivate: newIsPrivate } : p)));
  };

  // Handle Delete
  const handleDeletePhoto = async (photoId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this photo?')) {
      await deleteGalleryPhoto(photoId, token);
      setPhotos(photos.filter((p) => p.id !== photoId));
    }
  };

  const privatePhotos = photos.filter((p) => p.isPrivate);
  const publicPhotos = photos.filter((p) => !p.isPrivate);

  const displayedPhotos = galleryFilter === 'all' 
    ? photos 
    : galleryFilter === 'private' 
      ? privatePhotos 
      : publicPhotos;

  return (
    <div className="min-h-screen bg-[#070F1E] text-slate-100 flex flex-col font-body">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0A192F]/95 backdrop-blur-md border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold border border-[#2A4D78]"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">Back to Website</span>
            </button>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              <h1 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
                Sangram Admin <span className="text-[#D4AF37]">Dashboard</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{user?.name}</span>
              <span className="text-[10px] text-[#D4AF37] font-mono">Role: {user?.role.toUpperCase()}</span>
            </div>

            <button
              onClick={logout}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1E3A5F] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-sm'
                : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1E3A5F]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Visitor Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-sm'
                : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1E3A5F]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Private &amp; Public Gallery</span>
            <span className="px-1.5 py-0.2 bg-[#0A192F] text-[#D4AF37] rounded-full text-[10px]">
              {photos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-sm'
                : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1E3A5F]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#D4AF37] text-[#0A192F] shadow-sm'
                : 'bg-[#112240] text-slate-300 hover:text-white hover:bg-[#1E3A5F]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Roles</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: VISITOR ANALYTICS
           ======================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#112240] rounded-xl p-5 border border-[#1E3A5F]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Visitors</span>
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="mt-2 text-3xl font-extrabold text-white font-heading">
                  {analytics?.totalVisitors || 0}
                </div>
                <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>Unique IP / Device Sessions</span>
                </div>
              </div>

              <div className="bg-[#112240] rounded-xl p-5 border border-[#1E3A5F]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Page Views</span>
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-2 text-3xl font-extrabold text-white font-heading">
                  {analytics?.pageViews || 0}
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Hits across sections &amp; catalog
                </div>
              </div>

              <div className="bg-[#112240] rounded-xl p-5 border border-[#1E3A5F]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Private Vault Photos</span>
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-2 text-3xl font-extrabold text-white font-heading">
                  {privatePhotos.length}
                </div>
                <div className="mt-1 text-[11px] text-amber-300">
                  Visible ONLY inside Admin Vault
                </div>
              </div>

              <div className="bg-[#112240] rounded-xl p-5 border border-[#1E3A5F]">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Public Live Photos</span>
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="mt-2 text-3xl font-extrabold text-white font-heading">
                  {publicPhotos.length}
                </div>
                <div className="mt-1 text-[11px] text-[#D4AF37]">
                  Active on website public gallery
                </div>
              </div>
            </div>

            {/* Device Traffic & Top Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Device Traffic */}
              <div className="bg-[#112240] rounded-xl p-6 border border-[#1E3A5F] space-y-4">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Device Traffic Breakdown</span>
                </h3>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Mobile Phones</span>
                      <span className="font-bold">{analytics?.deviceBreakdown.mobile || 0} visits</span>
                    </div>
                    <div className="w-full h-2 bg-[#0A192F] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            ((analytics?.deviceBreakdown.mobile || 1) / 
                            ((analytics?.deviceBreakdown.mobile || 1) + (analytics?.deviceBreakdown.desktop || 1))) * 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5"><Monitor className="w-3.5 h-3.5 text-blue-400" /> Desktop &amp; Laptops</span>
                      <span className="font-bold">{analytics?.deviceBreakdown.desktop || 0} visits</span>
                    </div>
                    <div className="w-full h-2 bg-[#0A192F] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.round(
                            ((analytics?.deviceBreakdown.desktop || 1) / 
                            ((analytics?.deviceBreakdown.mobile || 1) + (analytics?.deviceBreakdown.desktop || 1))) * 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#0A192F] rounded-lg border border-[#1E3A5F] text-[11px] text-slate-400">
                  Traffic is heavily mobile-dominant (Odisha local inquiries and WhatsApp tap-throughs).
                </div>
              </div>

              {/* Top Visited Pages & Sections */}
              <div className="lg:col-span-2 bg-[#112240] rounded-xl p-6 border border-[#1E3A5F] space-y-4">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Most Viewed Sections</span>
                </h3>

                <div className="space-y-2 pt-1">
                  {analytics?.topPages.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0A192F] border border-[#1E3A5F] text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#112240] text-[#D4AF37] flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <code className="text-slate-200 font-mono">{item.path}</code>
                      </div>
                      <span className="font-bold text-[#D4AF37]">{item.count} views</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Visits Log Table */}
            <div className="bg-[#112240] rounded-xl p-6 border border-[#1E3A5F] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Recent Visitors Log</span>
                </h3>
                <button
                  onClick={fetchDashboardData}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#1E3A5F] text-slate-300 text-xs font-medium border border-[#2A4D78] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${loadingAnalytics ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0A192F] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1E3A5F]">
                    <tr>
                      <th className="p-3">Visit ID</th>
                      <th className="p-3">Target Section</th>
                      <th className="p-3">Device</th>
                      <th className="p-3">Referrer</th>
                      <th className="p-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A5F]/60">
                    {analytics?.recentVisits.map((v: VisitEvent) => (
                      <tr key={v.id} className="hover:bg-[#1E3A5F]/40 transition-colors">
                        <td className="p-3 font-mono text-slate-400">{v.id}</td>
                        <td className="p-3 font-semibold text-white">{v.path}</td>
                        <td className="p-3 capitalize">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            v.device === 'mobile' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {v.device === 'mobile' ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                            {v.device}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{v.referrer}</td>
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          {new Date(v.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: PHOTO MANAGEMENT (PRIVATE VAULT & PUBLIC SHOWCASE)
           ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Filter & Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#112240] p-4 rounded-xl border border-[#1E3A5F]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGalleryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    galleryFilter === 'all' ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#0A192F] text-slate-300 hover:text-white'
                  }`}
                >
                  All Photos ({photos.length})
                </button>
                <button
                  onClick={() => setGalleryFilter('private')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    galleryFilter === 'private' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-[#0A192F] text-slate-300 hover:text-white'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  <span>Private Vault ({privatePhotos.length})</span>
                </button>
                <button
                  onClick={() => setGalleryFilter('public')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    galleryFilter === 'public' ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-[#0A192F] text-slate-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Public Live ({publicPhotos.length})</span>
                </button>
              </div>

              <button
                onClick={() => setActiveTab('upload')}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPhotos.map((photo) => (
                <div 
                  key={photo.id}
                  className={`rounded-xl overflow-hidden border transition-all duration-300 bg-[#112240] flex flex-col justify-between ${
                    photo.isPrivate ? 'border-amber-500/40 ring-1 ring-amber-500/20' : 'border-[#1E3A5F]'
                  }`}
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Privacy Status Badge */}
                      <div className="absolute top-3 left-3">
                        {photo.isPrivate ? (
                          <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Private · Admin Vault</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-md">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Public · Live on Website</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] font-bold text-[#D4AF37] uppercase">
                          {photo.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <h4 className="font-heading text-base font-bold text-white">
                        {photo.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {photo.caption}
                      </p>
                      <div className="mt-3 text-[10px] text-slate-400">
                        Added: {new Date(photo.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar: Toggle Visibility & Delete */}
                  <div className="p-5 pt-0 border-t border-[#1E3A5F] mt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleVisibility(photo)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        photo.isPrivate
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                      title={photo.isPrivate ? 'Click to make Public' : 'Click to make Private'}
                    >
                      {photo.isPrivate ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Make Public</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Make Private</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {displayedPhotos.length === 0 && (
              <div className="p-12 text-center bg-[#112240] rounded-xl border border-[#1E3A5F] text-slate-400">
                No photos found in this category. Click &quot;Upload New Photo&quot; to add.
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 3: PHOTO UPLOAD SYSTEM
           ======================================================== */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto bg-[#112240] rounded-2xl p-6 sm:p-8 border border-[#1E3A5F] shadow-xl animate-in fade-in duration-200">
            <div className="border-b border-[#1E3A5F] pb-4 mb-6">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#D4AF37]" />
                <span>Upload Photo to Studio Gallery</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Upload new resin art masterworks, flex prints, or shop signboards. Choose whether to keep it Private (Admin Vault) or publish it live.
              </p>
            </div>

            {uploadSuccess && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {uploadError && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-5">
              
              {/* Image Input Options: File upload OR Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  Image Source <span className="text-red-400">*</span>
                </label>
                
                <div className="space-y-3">
                  {/* File Upload Box */}
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#2A4D78] hover:border-[#D4AF37] rounded-xl bg-[#0A192F] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-[#D4AF37] mb-2" />
                    <span className="text-xs font-bold text-white">Click or Drag &amp; Drop to Upload Image File</span>
                    <span className="text-[10px] text-slate-400 mt-1">JPG, PNG, WebP up to 8MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {/* Or Image URL */}
                  <div className="relative">
                    <input
                      type="text"
                      value={uploadImage}
                      onChange={(e) => setUploadImage(e.target.value)}
                      placeholder="Or paste external Image URL (https://... or /images/...)"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-[#2A4D78] text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Preview */}
                {uploadImage && (
                  <div className="mt-3 p-2 bg-[#0A192F] rounded-lg border border-[#2A4D78] flex items-center gap-3">
                    <img
                      src={uploadImage}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="text-xs text-slate-300">
                      <div className="font-bold text-white">Image Preview Ready</div>
                      <div className="text-[10px] text-emerald-400">Validated for rendering</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  Photo Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. 24K Gold Foil Resin Name Plate"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-[#2A4D78] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  Product Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => {
                    setUploadCategory(e.target.value);
                    const labelMap: Record<string, string> = {
                      resin: 'Resin Art',
                      keychains: 'Resin Keychains',
                      'photo-frames': 'Photo Frames',
                      'custom-gifts': 'Custom Gifts',
                      banners: 'Flex Banners',
                      boards: 'Shop Boards',
                      stationery: 'Wedding & Visiting Cards',
                      vinyl: 'Vinyl & Posters'
                    };
                    setUploadCategoryLabel(labelMap[e.target.value] || 'Resin Art');
                  }}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-[#2A4D78] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
                >
                  <option value="resin">Resin Art (General)</option>
                  <option value="keychains">Resin Keychains</option>
                  <option value="photo-frames">Photo Frames</option>
                  <option value="custom-gifts">Custom Gifts &amp; Varmala</option>
                  <option value="banners">Flex Banners</option>
                  <option value="boards">Shop Boards &amp; Acrylic</option>
                  <option value="stationery">Wedding &amp; Visiting Cards</option>
                  <option value="vinyl">Vinyl &amp; Posters</option>
                </select>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  placeholder="Enter specifications, wood species, dimensions or client reference notes..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A192F] border border-[#2A4D78] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Privacy Setting Toggle: Private vs Public */}
              <div className="p-4 rounded-xl bg-[#0A192F] border border-[#2A4D78] space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wide flex items-center justify-between">
                  <span>Gallery Visibility Status</span>
                  {uploadIsPrivate ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Private (Admin Only)
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Public (Visible on Website)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setUploadIsPrivate(true)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      uploadIsPrivate
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-[#112240] text-slate-400 hover:text-white'
                    }`}
                  >
                    🔒 Private Vault (Admin Only)
                  </button>

                  <button
                    type="button"
                    onClick={() => setUploadIsPrivate(false)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !uploadIsPrivate
                        ? 'bg-emerald-400 text-slate-950 shadow-sm'
                        : 'bg-[#112240] text-slate-400 hover:text-white'
                    }`}
                  >
                    🌐 Public (Website Gallery)
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {uploadIsPrivate
                    ? 'Private photos are stored securely in your Admin Vault and will NOT be visible to public visitors.'
                    : 'Public photos will immediately show in the public website gallery under their respective category.'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3.5 px-6 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] font-bold text-sm transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin" />
                    <span>Processing &amp; Storing Photo...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Confirm &amp; Save Photo</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

        {/* ========================================================
            TAB 4: ROLE SYSTEM & USERS OVERVIEW
           ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#112240] p-6 rounded-xl border border-[#1E3A5F]">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>Role Permissions Matrix</span>
              </h3>
              <p className="text-xs text-slate-300">
                Security enforcement prevents unauthorized dashboard access. Non-admin users are automatically restricted from the admin route.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0A192F] border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#D4AF37] text-sm">Role: Admin</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">FULL ACCESS</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full access to /admin-dashboard</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Upload and delete studio photography</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> View private vault photos</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Toggle public/private visibility</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> View real-time visitor analytics</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#0A192F] border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-300 text-sm">Role: User (Customer)</span>
                    <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-bold">RESTRICTED</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li className="flex items-center gap-1.5 text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Can create account and log in</li>
                    <li className="flex items-center gap-1.5 text-slate-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> View public catalog &amp; send inquiries</li>
                    <li className="flex items-center gap-1.5 text-red-400"><AlertCircle className="w-3.5 h-3.5" /> NO access to /admin-dashboard (redirected to home)</li>
                    <li className="flex items-center gap-1.5 text-red-400"><AlertCircle className="w-3.5 h-3.5" /> NO access to private gallery content</li>
                    <li className="flex items-center gap-1.5 text-red-400"><AlertCircle className="w-3.5 h-3.5" /> NO access to visitor analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
