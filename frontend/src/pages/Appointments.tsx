import { Plus } from 'lucide-react';
import DataTable from '../components/DataTable';
import { Appointment } from '../types/appointment';

const mockAppointments: Appointment[] = [
  {
    id: 1,
    agent_id: 1,
    lead_id: 101,
    lead_name: 'Rahul Sharma',
    property_title: 'Luxury Villa',
    scheduled_at: '2024-05-15T10:30:00Z',
    status: 'scheduled',
  },
  {
    id: 2,
    agent_id: 1,
    lead_id: 102,
    lead_name: 'Anjali Gupta',
    property_title: 'Studio Apartment',
    scheduled_at: '2024-05-16T14:00:00Z',
    status: 'completed',
  },
];

export default function Appointments() {
  const columns = [
    { 
      header: 'Date & Time', 
      accessor: (app: Appointment) => {
        const date = new Date(app.scheduled_at);
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900">
              {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
            <span className="text-xs text-slate-500">
              {date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      }
    },
    { header: 'Lead', accessor: 'lead_name' as keyof Appointment },
    { header: 'Property', accessor: 'property_title' as keyof Appointment },
    {
      header: 'Status',
      accessor: (app: Appointment) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          app.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
          app.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
          'bg-slate-100 text-slate-700'
        }`}>
          {app.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: () => (
        <button className="text-blue-600 text-sm font-bold hover:underline">Reschedule</button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Appointments</h2>
          <p className="text-sm text-slate-500">Manage your property viewings and meetings.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
          <Plus size={18} />
          New Appointment
        </button>
      </div>

      {/* Reusing your DataTable component */}
      <DataTable data={mockAppointments} columns={columns} />
    </div>
  );
}
