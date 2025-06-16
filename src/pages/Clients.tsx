import { useState } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, Phone, Mail, Building } from 'lucide-react';

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    contact: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Tech City, TC 12345',
    cameras: 8,
    status: 'active',
    contractStart: '2024-01-15',
    contractEnd: '2025-01-14'
  },
  {
    id: 2,
    name: 'MediCare Center',
    contact: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medicare.com',
    phone: '+1 (555) 987-6543',
    address: '456 Health St, Medical District, MD 67890',
    cameras: 12,
    status: 'active',
    contractStart: '2023-06-01',
    contractEnd: '2024-05-31'
  },
  {
    id: 3,
    name: 'DataFlow Systems',
    contact: 'Mike Chen',
    email: 'mike.chen@dataflow.com',
    phone: '+1 (555) 456-7890',
    address: '789 Data Drive, Server Valley, SV 13579',
    cameras: 6,
    status: 'pending',
    contractStart: '2024-03-01',
    contractEnd: '2025-02-28'
  },
  {
    id: 4,
    name: 'LogiTech Warehouse',
    contact: 'Amanda Rodriguez',
    email: 'amanda.r@logitech-wh.com',
    phone: '+1 (555) 321-0987',
    address: '321 Warehouse Blvd, Industrial Park, IP 24680',
    cameras: 15,
    status: 'expired',
    contractStart: '2022-12-01',
    contractEnd: '2023-11-30'
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage your security service clients</p>
        </div>
        <button
          onClick={() => console.log('Add new client')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{client.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building className="w-4 h-4" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{client.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary-600">{client.cameras}</div>
                  <div className="text-xs text-gray-500">Cameras</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(client.contractEnd).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">Contract End</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new client.</p>
        </div>
      )}
    </div>
  );
};

export default Clients;
