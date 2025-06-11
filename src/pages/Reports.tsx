import { useState } from 'react';
import { Calendar, Download, Filter, AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';

// Mock data for reports
const mockReports = [
  {
    id: 1,
    title: 'Unauthorized Access Attempt',
    type: 'security',
    severity: 'high',
    camera: 'Main Entrance',
    client: 'TechCorp Inc.',
    timestamp: '2024-06-10T14:30:00Z',
    status: 'resolved',
    description: 'Motion detected outside business hours at main entrance',
    assignedTo: 'John Doe'
  },
  {
    id: 2,
    title: 'Camera Offline Alert',
    type: 'technical',
    severity: 'medium',
    camera: 'Reception Area',
    client: 'MediCare Center',
    timestamp: '2024-06-10T09:15:00Z',
    status: 'pending',
    description: 'Camera went offline during routine operation',
    assignedTo: 'Mike Johnson'
  },
  {
    id: 3,
    title: 'Suspicious Activity',
    type: 'security',
    severity: 'high',
    camera: 'Parking Lot North',
    client: 'TechCorp Inc.',
    timestamp: '2024-06-09T22:45:00Z',
    status: 'investigating',
    description: 'Unusual movement patterns detected in parking area',
    assignedTo: 'Jane Smith'
  },
  {
    id: 4,
    title: 'Maintenance Completed',
    type: 'maintenance',
    severity: 'low',
    camera: 'Server Room',
    client: 'DataFlow Systems',
    timestamp: '2024-06-09T16:00:00Z',
    status: 'resolved',
    description: 'Scheduled maintenance and cleaning completed',
    assignedTo: 'Sarah Wilson'
  },
  {
    id: 5,
    title: 'Motion Detection Test',
    type: 'system',
    severity: 'low',
    camera: 'Emergency Exit',
    client: 'TechCorp Inc.',
    timestamp: '2024-06-09T10:30:00Z',
    status: 'resolved',
    description: 'Weekly motion detection system test completed successfully',
    assignedTo: 'John Doe'
  }
];

const Reports = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || report.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesType && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'investigating':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security':
        return '🔒';
      case 'technical':
        return '⚙️';
      case 'maintenance':
        return '🔧';
      case 'system':
        return '💻';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-600">View and manage security incident reports</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Reports</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="security">Security</option>
            <option value="technical">Technical</option>
            <option value="maintenance">Maintenance</option>
            <option value="system">System</option>
          </select>

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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>

          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{getTypeIcon(report.type)}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report.severity)}`}>
                    {report.severity}
                  </span>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(report.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{report.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Camera:</span> {report.camera}
                  </div>
                  <div>
                    <span className="font-medium">Client:</span> {report.client}
                  </div>
                  <div>
                    <span className="font-medium">Assigned to:</span> {report.assignedTo}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {new Date(report.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more reports.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
