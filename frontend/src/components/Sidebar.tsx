import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CalendarCheck, 
  UserCircle, 
  LogOut 
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Properties', icon: Building2, path: '/properties' },
    { name: 'Leads', icon: Users, path: '/leads' },
    { name: 'Appointments', icon: CalendarCheck, path: '/appointments' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
 <div className="flex flex-col h-screen w-64 bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400 tracking-tight">PropertyPro</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Agent CRM</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive ? 'bg-slate-800' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
       <div className="p-4 border-t border-slate-800">
        <button className="flex items-center space-x-3 p-3 w-full text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
    );
}