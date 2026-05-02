import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import DataTable from '../components/DataTable'; 
import { Property } from '../types/property';  

const mockProperties: Property[] = [ // Cast to Property array
  { id: 1, title: 'Luxury Villa', price: 500000, location: 'Mumbai', status: 'available', agent_id: 1, created_at: '2024-01-01' },
  { id: 2, title: 'Studio Apartment', price: 150000, location: 'Pune', status: 'sold', agent_id: 1, created_at: '2024-01-01' },
  { id: 3, title: 'Penthouse', price: 850000, location: 'Bangalore', status: 'rented', agent_id: 1, created_at: '2024-01-01' },
];


export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProperties = mockProperties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || prop.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    { header: 'Property', accessor: 'title' as keyof Property },
    { header: 'Location', accessor: 'location' as keyof Property },
    {
      header: 'Price',
      accessor: (prop: Property) => `$${prop.price.toLocaleString()}`,
    },
    {
      header: 'Status',
      accessor: (prop: Property) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            prop.status === 'available'
              ? 'bg-emerald-100 text-emerald-700'
              : prop.status === 'sold'
              ? 'bg-rose-100 text-rose-700'
              : 'bg-sky-100 text-sky-700'
          }`}
        >
          {prop.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Properties</h2>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />

          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>

        <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <DataTable data={filteredProperties} columns={columns} />
    </div>
  );
}