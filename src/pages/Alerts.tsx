import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, X, Filter, Bell, Camera, Wifi, WifiOff } from 'lucide-react';

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    type: 'camera_offline',
    severity: 'high',
    title: 'Camera Offline',
    message: 'Reception Area camera has gone offline',
    camera: 'Reception Area',
    client: 'MediCare Center',
    timestamp: '2024-06-10T16:45:00Z',
    status: 'active',
    acknowledged: false
  },
  {
    id: 2,
    type: 'motion_detection',
    severity: 'medium',
    title: 'Motion Detected',
    message: 'Unusual motion detected outside business hours',
    camera: 'Main Entrance',
    client: 'TechCorp Inc.',
    timestamp: '2024-06-10T14:30:00Z',
    status: 'acknowledged',
    acknowledged: true
  },
  {
    id: 3,
    type: 'system_error',
    severity: 'low',
    title: 'System Warning',
    message: 'Storage space is running low (85% full)',
    camera: null,
    client: null,
    timestamp: '2024-06-10T12:15:00Z',
    status: 'resolved',
    acknowledged: true
  },
  {
    id: 4,
    type: 'unauthorized_access',
    severity: 'high',
    title: 'Security Alert',
    message: 'Failed login attempts detected',
    camera: null,
    client: null,
    timestamp: '2024-06-10T10:20:00Z',
    status: 'active',
    acknowledged: false
  },
  {
    id: 5,
    type: 'maintenance_due',
    severity: 'low',
    title: 'Maintenance Due',
    message: 'Scheduled maintenance required for Server Room camera',
    camera: 'Server Room',
    client: 'DataFlow Systems',
    timestamp: '2024-06-10T08:00:00Z',
    status: 'acknowledged',
    acknowledged: true
  }
];

const Alerts = () => {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    
    return matchesSeverity && matchesStatus && matchesType;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'camera_offline':
        return <WifiOff className="w-5 h-5 text-red-500" />;
      case 'motion_detection':
        return <Camera className="w-5 h-5 text-yellow-500" />;
      case 'system_error':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'unauthorized_access':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'maintenance_due':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'acknowledged':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeAlertsCount = mockAlerts.filter(alert => alert.status === 'active').length;
  const acknowledgedAlertsCount = mockAlerts.filter(alert => alert.status === 'acknowledged').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alert Management</h1>
          <p className="text-gray-600">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">{activeAlertsCount} Active Alerts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{acknowledgedAlertsCount} Acknowledged</span>
          </div>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">{activeAlertsCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Acknowledged</p>
              <p className="text-2xl font-bold text-yellow-600">{acknowledgedAlertsCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{mockAlerts.length}</p>
            </div>
            <Bell className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="camera_offline">Camera Offline</option>
            <option value="motion_detection">Motion Detection</option>
            <option value="system_error">System Error</option>
            <option value="unauthorized_access">Security Alert</option>
            <option value="maintenance_due">Maintenance</option>
          </select>

          <button className="btn-secondary">Clear Filters</button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(alert.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    {alert.camera && <span>Camera: {alert.camera}</span>}
                    {alert.client && <span>Client: {alert.client}</span>}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {alert.status === 'active' && (
                  <button className="btn-accent text-sm">
                    Acknowledge
                  </button>
                )}
                {alert.status === 'acknowledged' && (
                  <button className="btn-primary text-sm">
                    Resolve
                  </button>
                )}
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more alerts.</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
