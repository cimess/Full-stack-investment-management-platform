import React, { useState, useEffect } from 'react';
import { User, Shield, Bell, Globe, Mail, Loader2 } from 'lucide-react';
import Switch from '../../../components/switchButton/switch';
import { useGetMe, useUpdateManagerProfile, useUpdateUserSettings } from '../../../hooks/useQuery';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const SettingsView: React.FC = () => {
  const [tradeNotification, setTradeNotification] = React.useState(false);
  const { data: meData, isLoading } = useGetMe();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateManagerProfile();
  const { mutate: updateSettings } = useUpdateUserSettings();
  const queryClient = useQueryClient();

  const user = meData?.data;
  const managerData = user?.manager;

  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    specialization: '',
    years_experience: '',
    success_rate: '',
    contact_email: '',
    availability: '',
    aum_managed: ''
  });

  useEffect(() => {
    if (managerData) {
      setFormData({
        title: managerData.title || '',
        bio: managerData.bio || '',
        specialization: managerData.specialization || '',
        years_experience: managerData.years_experience?.toString() || '',
        success_rate: managerData.success_rate?.toString() || '',
        contact_email: managerData.contact_email || '',
        availability: managerData.availability || '',
        aum_managed: managerData.aum_managed?.toString() || ''
      });
    }
    if (user?.settings) {
      setTradeNotification(user.settings.tradeNotifications);
    }
  }, [managerData, user?.settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update profile");
      }
    });
  };

  const handleTradeNotificationState = () => {
    const newState = !tradeNotification;
    setTradeNotification(newState); // Optimistic UI update
    updateSettings({ tradeNotifications: newState }, {
      onSuccess: () => {
        toast.success("Notification settings updated");
        queryClient.invalidateQueries({ queryKey: ["me"] });
      },
      onError: () => {
        setTradeNotification(!newState); // Revert on failure
        toast.error("Failed to update notification settings");
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-white font-bold text-2xl">Manager Settings</h2>
        <p className="text-slate-500 text-sm">Manage your profile, security, and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <h3 className="text-white font-bold text-sm">Profile Information</h3>
          <p className="text-slate-500 text-xs">Update your public profile and contact details.</p>
        </div>
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {user?.fullname?.charAt(0).toUpperCase() || 'M'}
             </div>
             <div>
                <button className="px-4 py-2 bg-white/5 text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-colors">Change Photo</button>
                <p className="text-slate-500 text-[10px] mt-2">JPG, GIF or PNG. Max size of 800K</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Job Title</label>
               <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Portfolio Manager" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Public Contact Email</label>
               <input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} placeholder={user?.email} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
               <label className="text-slate-400 text-xs font-medium">Executive Bio</label>
               <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="A short description of your experience and focus..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 resize-none" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Specialization</label>
               <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. Growth Equity, Tech" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Availability</label>
               <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="e.g. Mon-Fri, 9am-5pm EST" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Years Experience</label>
               <input type="number" name="years_experience" value={formData.years_experience} onChange={handleChange} placeholder="e.g. 12" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
            <div className="space-y-1.5">
               <label className="text-slate-400 text-xs font-medium">Success Rate (%)</label>
               <input type="number" name="success_rate" value={formData.success_rate} onChange={handleChange} placeholder="e.g. 98" max="100" min="0" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <h3 className="text-white font-bold text-sm">Security</h3>
          <p className="text-slate-500 text-xs">Manage your password and authentication methods.</p>
        </div>
        <div className="md:col-span-2 space-y-3">
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-white text-sm font-medium">Two-Factor Authentication</span>
             </div>
             <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md">Enabled</span>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-amber-400" />
                <span className="text-white text-sm font-medium">Trade Notifications</span>
             </div>
             <button className='relative w-8 h-4 bg-white/10 rounded-full ' onClick={handleTradeNotificationState}>
             <Switch state={tradeNotification}
             />
             </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 mb-10">
         <button onClick={handleSave} disabled={isUpdating} className={`px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isUpdating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Save All Changes'}
         </button>
      </div>
    </div>
  );
};

export default SettingsView;
