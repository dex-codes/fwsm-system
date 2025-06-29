import { useState } from 'react';
import { Filter, Grid, List, Shield, Eye, Building, User, Crown } from 'lucide-react';
import CameraCard from '../components/CameraCard';
import { usePersona } from '../contexts/PersonaContext';

type CameraStatus = 'online' | 'offline' | 'maintenance';

interface Camera {
  id: number;
  name: string;
  location: string;
  client: string;
  status: CameraStatus;
  lastSeen: string;
  thumbnail: string;
}

// Mock data for cameras
const mockCameras: Camera[] = [
  {
    id: 1,
    name: 'Main Entrance',
    location: 'Building A - Floor 1',
    client: 'TechCorp Inc.',
    status: 'online' as const,
    lastSeen: '2 minutes ago',
    thumbnail: 'https://via.placeholder.com/320x180/1e3a5f/ffffff?text=Camera+1'
  },
  {
    id: 2,
    name: 'Parking Lot North',
    location: 'Outdoor - North Side',
    client: 'TechCorp Inc.',
    status: 'online' as const,
    lastSeen: '1 minute ago',
    thumbnail: 'https://via.placeholder.com/320x180/4a90a4/ffffff?text=Camera+2'
  },
  {
    id: 3,
    name: 'Reception Area',
    location: 'Building A - Floor 1',
    client: 'MediCare Center',
    status: 'offline' as const,
    lastSeen: '15 minutes ago',
    thumbnail: ''
  },
  {
    id: 4,
    name: 'Emergency Exit',
    location: 'Building B - Floor 2',
    client: 'TechCorp Inc.',
    status: 'online' as const,
    lastSeen: '30 seconds ago',
    thumbnail: 'https://via.placeholder.com/320x180/1e3a5f/ffffff?text=Camera+4'
  },
  {
    id: 5,
    name: 'Server Room',
    location: 'Building A - Basement',
    client: 'DataFlow Systems',
    status: 'online' as const,
    lastSeen: '1 minute ago',
    thumbnail: 'https://via.placeholder.com/320x180/4a90a4/ffffff?text=Camera+5'
  },
  {
    id: 6,
    name: 'Loading Dock',
    location: 'Building C - Ground Floor',
    client: 'LogiTech Warehouse',
    status: 'maintenance' as const,
    lastSeen: '2 hours ago',
    thumbnail: ''
  }
];

const Dashboard = () => {
  const { personaConfig, currentPersona } = usePersona();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter cameras based on persona permissions
  const getPersonaFilteredCameras = () => {
    let cameras = mockCameras;

    // Apply persona-specific filtering
    switch (currentPersona) {
      case 'security-officer':
        // Security officers only see cameras assigned to them (mock: first 3 cameras)
        cameras = cameras.slice(0, 3);
        break;
      case 'supervisor':
        // Supervisors see cameras from stores they supervise (mock: exclude last camera)
        cameras = cameras.slice(0, -1);
        break;
      case 'client':
        // Clients only see their own store cameras (mock: TechCorp cameras only)
        cameras = cameras.filter(camera => camera.client === 'TechCorp Inc.');
        break;
      case 'admin':
      case 'super-admin':
        // Admins see all cameras
        break;
    }

    return cameras;
  };

  const personaFilteredCameras = getPersonaFilteredCameras();

  const filteredCameras = personaFilteredCameras.filter(camera => {
    if (filterStatus === 'all') return true;
    return camera.status === filterStatus;
  });

  const getPersonaSpecificDescription = () => {
    switch (currentPersona) {
      case 'security-officer':
        return 'Monitor your assigned cameras and create incident reports';
      case 'supervisor':
        return 'Oversee security operations and review officer activities';
      case 'client':
        return 'View your store cameras and security reports';
      case 'admin':
        return 'Manage system users and monitor all security operations';
      case 'super-admin':
        return 'Full system administration and oversight';
      default:
        return 'Monitor security cameras';
    }
  };

  const getPersonaAccessInfo = () => {
    switch (currentPersona) {
      case 'security-officer':
        return 'Assigned cameras only';
      case 'supervisor':
        return 'Supervised locations';
      case 'client':
        return 'Your stores only';
      case 'admin':
        return 'All system cameras';
      case 'super-admin':
        return 'Full system access';
      default:
        return '';
    }
  };

  const sortedCameras = [...filteredCameras].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'location':
        return a.location.localeCompare(b.location);
      case 'client':
        return a.client.localeCompare(b.client);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Camera Dashboard</h1>
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900 rounded-full">
              {currentPersona === 'security-officer' && <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              {currentPersona === 'supervisor' && <Eye className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              {currentPersona === 'client' && <Building className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              {currentPersona === 'admin' && <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              {currentPersona === 'super-admin' && <Crown className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {personaConfig.shortName}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {getPersonaSpecificDescription()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCameras.length} of {personaFilteredCameras.length} cameras
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {getPersonaAccessInfo()}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Filter by Status */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="name">Camera Name</option>
                <option value="location">Location</option>
                <option value="client">Client</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Camera Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {sortedCameras.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cameras found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more cameras.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
