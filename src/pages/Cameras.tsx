import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Building, User, Wifi, WifiOff, Wrench, Edit, Trash2 } from 'lucide-react';

// Mock data for cameras
const mockCameras = [
  {
    id: 1,
    name: 'Main Entrance',
    location: 'Building A - Floor 1',
    client: 'TechCorp Inc.',
    assignedTo: 'John Doe',
    status: 'online',
    ipAddress: '192.168.1.101',
    model: 'SecureCam Pro X1',
    installDate: '2024-01-15',
    lastMaintenance: '2024-05-15'
  },
  {
    id: 2,
    name: 'Parking Lot North',
    location: 'Outdoor - North Side',
    client: 'TechCorp Inc.',
    assignedTo: 'Jane Smith',
    status: 'online',
    ipAddress: '192.168.1.102',
    model: 'OutdoorGuard 4K',
    installDate: '2024-01-20',
    lastMaintenance: '2024-05-20'
  },
  {
    id: 3,
    name: 'Reception Area',
    location: 'Building A - Floor 1',
    client: 'MediCare Center',
    assignedTo: 'Mike Johnson',
    status: 'offline',
    ipAddress: '192.168.2.101',
    model: 'SecureCam Pro X1',
    installDate: '2023-06-01',
    lastMaintenance: '2024-03-01'
  },
  {
    id: 4,
    name: 'Emergency Exit',
    location: 'Building B - Floor 2',
    client: 'TechCorp Inc.',
    assignedTo: 'John Doe',
    status: 'online',
    ipAddress: '192.168.1.103',
    model: 'HallwayWatch HD',
    installDate: '2024-02-01',
    lastMaintenance: '2024-05-01'
  },
  {
    id: 5,
    name: 'Server Room',
    location: 'Building A - Basement',
    client: 'DataFlow Systems',
    assignedTo: 'Sarah Wilson',
    status: 'maintenance',
    ipAddress: '192.168.3.101',
    model: 'SecureCam Pro X2',
    installDate: '2024-03-01',
    lastMaintenance: '2024-06-01'
  }
];

const Cameras = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const filteredCameras = mockCameras.filter(camera => {
    const matchesSearch = camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         camera.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || camera.status === statusFilter;
    const matchesClient = clientFilter === 'all' || camera.client === clientFilter;
    const matchesAssignee = assigneeFilter === 'all' || camera.assignedTo === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesClient && matchesAssignee;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const uniqueClients = [...new Set(mockCameras.map(camera => camera.client))];
  const uniqueAssignees = [...new Set(mockCameras.map(camera => camera.assignedTo))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Camera Management</h1>
          <p className="text-gray-600">Manage and monitor all security cameras</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Camera</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cameras by name or location..."
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
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Clients</option>
            {uniqueClients.map(client => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>

          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Staff</option>
            {uniqueAssignees.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cameras Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Camera
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCameras.map((camera) => (
                <tr key={camera.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{camera.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {camera.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(camera.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(camera.status)}`}>
                        {camera.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      {camera.client}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {camera.assignedTo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>IP: {camera.ipAddress}</div>
                      <div>{camera.model}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cameras found</h3>
          <p className="text-gray-500">Try adjusting your filters or add a new camera.</p>
        </div>
      )}
    </div>
  );
};

export default Cameras;
