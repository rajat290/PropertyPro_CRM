import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Edit3, 
  Building2, 
  Users, 
  Calendar, 
  Banknote,
  Upload 
} from 'lucide-react';
import DataTable from '../components/DataTable';
import { Agent, Activity } from '../types/index';

// Mock agent profile data
const agentProfile: Agent = {
  id: 1,
  name: 'Vikas Sharma',
  email: 'vikas@agentpro.com',
  phone: '+91 98765 43210',
  bio: 'Experienced real estate agent with 5+ years in luxury properties. Specializing in Mumbai & Pune markets.',
  avatar: '/api/placeholder/120/120'
};

// Mock recent activity
const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'viewing',
    title: 'Luxury Villa - Bandra',
    date: '2024-07-20 10:30 AM',
    leadName: 'Rahul Sharma'
  },
  {
    id: 2,
    type: 'email',
    title: 'Follow-up on Studio Apartment',
    date: '2024-07-19 3:15 PM',
    leadName: 'Anjali Gupta'
  },
  {
    id: 3,
    type: 'call',
    title: 'Qualified lead discussion',
    date: '2024-07-18 11:00 AM',
    leadName: 'Vikram Singh'
  },
  {
    id: 4,
    type: 'meeting',
    title: 'Property closing meeting',
    date: '2024-07-17 2:30 PM',
    leadName: 'Priya Verma'
  }
];

// KPI stats for profile
const profileStats = [
  { name: 'Properties Listed', value: '12', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Leads Managed', value: '45', icon: Users, color: 'text-purple-600', bg: 'purple-50' },
  { name: 'Appointments', value: '8', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Monthly Revenue', value: '$12.5k', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(agentProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save
    setIsEditing(false);
  };

  const activityColumns = [
    {
      header: 'Activity',
      accessor: (act: Activity) => (
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            act.type === 'viewing' ? 'bg-blue-100 text-blue-800' :
            act.type === 'email' ? 'bg-green-100 text-green-800' :
            act.type === 'call' ? 'bg-purple-100 text-purple-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {act.type}
          </span>
          <span className="font-medium text-slate-900">{act.title}</span>
        </div>
      )
    },
    {
      header: 'Lead',
      accessor: 'leadName' as keyof Activity
    },
    {
      header: 'Date',
      accessor: 'date' as keyof Activity
    },
    {
      header: '',
      accessor: () => (
        <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">My Profile</h2>
          <p className="text-slate-500 mt-1">Manage your agent account and preferences</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm font-medium"
        >
          <Edit3 size={18} />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profileStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Profile Information</h3>
          <div className="space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                  VS
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    className="hidden" 
                    id="avatar"
                    accept="image/*"
                  />
                  <label 
                    htmlFor="avatar" 
                    className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium cursor-pointer transition-all"
                  >
                    <Upload size={16} />
                    Change Photo
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={profile.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
          <DataTable data={mockActivities} columns={activityColumns} />
        </div>
      </div>
    </div>
  );
}
