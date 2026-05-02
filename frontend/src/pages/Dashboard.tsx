import { 
  Building2, 
  Users, 
  Calendar, 
  Banknote,
  TrendingUp
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// --- MOCK DATA (Phase 2 Pattern) ---
const kpiStats = [
  { name: 'Total Properties', value: '12', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Active Leads', value: '45', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Appointments', value: '8', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Total Revenue', value: '$45k', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const leadTrendData = [
  { month: 'Jan', leads: 20 },
  { month: 'Feb', leads: 35 },
  { month: 'Mar', leads: 25 },
  { month: 'Apr', leads: 45 },
  { month: 'May', leads: 30 },
  { month: 'Jun', leads: 55 },
];

const statusBreakdown = [
  { name: 'New', value: 40, color: '#3b82f6' },      // blue-500
  { name: 'Contacted', value: 30, color: '#8b5cf6' }, // purple-500
  { name: 'Qualified', value: 20, color: '#f59e0b' }, // amber-500
  { name: 'Closed', value: 10, color: '#10b981' },    // emerald-500
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          <TrendingUp size={16} />
          <span>+12% growth this month</span>
        </div>
      </div>

      {/* --- KPI CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiStats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Live</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- ANALYTICS CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bar Chart - Leads by Month (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Leads Performance</h3>
            <p className="text-sm text-slate-500">Monthly breakdown of incoming leads</p>
          </div>
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="leads" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]} 
                  barSize={45} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Lead Status */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">Lead Status</h3>
            <p className="text-sm text-slate-500">Current pipeline distribution</p>
          </div>
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {statusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle" 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
