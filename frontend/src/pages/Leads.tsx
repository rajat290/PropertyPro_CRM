import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Lead, LeadStatus } from '../types/lead';

const mockLeads: Lead[] = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', status: 'new' },
  { id: 2, name: 'Anjali Gupta', email: 'anjali@example.com', phone: '9123456789', status: 'contacted' },
  { id: 3, name: 'Vikram Singh', email: 'vikram@example.com', phone: '9988776655', status: 'qualified' },
  { id: 4, name: 'Priya Verma', email: 'priya@example.com', phone: '9443322110', status: 'closed' },
  { id: 5, name: 'Amit Kumar', email: 'amit@example.com', phone: '9000011111', status: 'new' },
];

const COLUMNS: { label: string; value: LeadStatus; color: string }[] = [
  { label: 'New', value: 'new', color: 'bg-blue-500' },
  { label: 'Contacted', value: 'contacted', color: 'bg-purple-500' },
  { label: 'Qualified', value: 'qualified', color: 'bg-amber-500' },
  { label: 'Closed', value: 'closed', color: 'bg-emerald-500' },
];

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic
  const filteredLeads = mockLeads.filter((lead) => {
    return (
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Leads Pipeline</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> Add Lead
        </button>
      </div>

      {/* Search Bar UI */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search leads by name, email or phone..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLUMNS.map((column) => {
          // Get leads specifically for this column from the FILTERED list
          const columnLeads = filteredLeads.filter(l => l.status === column.value);

          return (
            <div key={column.value} className="bg-slate-100/50 rounded-xl p-4 min-h-[500px] border border-slate-200/60">
              {/* Column Header */}
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${column.color}`}></div>
                <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
                  {column.label}
                </h3>
                <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-slate-400 ml-auto border border-slate-200">
                  {columnLeads.length}
                </span>
              </div>

              {/* Lead Cards */}
              <div className="space-y-3">
                {columnLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
                  >
                    <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {lead.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 truncate">{lead.email}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{lead.phone}</p>
                    
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                        ID: {lead.id}
                      </span>
                      <button className="text-[11px] text-blue-600 font-bold hover:underline">
                        Details
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty State for Column */}
                {columnLeads.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400">No leads here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
