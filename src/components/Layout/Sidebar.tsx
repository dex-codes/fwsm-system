import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Monitor,
  Users,
  Camera,
  FileText,
  UserCheck,
  AlertTriangle,
  Settings,
  ChevronLeft
} from 'lucide-react';
import { usePersona } from '../../contexts/PersonaContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { canAccessRoute, personaConfig } = usePersona();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    { path: '/dashboard', icon: Monitor, label: 'Dashboard', description: 'Camera Views' },
    { path: '/clients', icon: Users, label: 'Clients', description: 'Client Management' },
    { path: '/cameras', icon: Camera, label: 'Cameras', description: 'Camera Management' },
    { path: '/reports', icon: FileText, label: 'Reports', description: 'Incident Reports' },
    { path: '/users', icon: UserCheck, label: 'Users', description: 'Staff Management' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts', description: 'Real-time Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings', description: 'System Settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  };

  const shouldShowExpanded = !isCollapsed || isHovered;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before collapsing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
        shouldShowExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {shouldShowExpanded ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src="/resruve-logo-no-bg.png"
                  alt="ReSurve Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className={`transition-all duration-300 ease-in-out ${
                shouldShowExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}>
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">ReSurve</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Security Monitoring</p>
                <div className="mt-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded text-xs text-primary-700 dark:text-primary-300 whitespace-nowrap">
                  {personaConfig.shortName}
                </div>
              </div>
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Collapse Sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/resruve-logo-no-bg.png"
                alt="ReSurve Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems
            .filter(item => canAccessRoute(item.path))
            .map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                  } ${
                    shouldShowExpanded
                      ? 'flex items-center px-4 py-3'
                      : 'flex items-center justify-center p-3 mx-2 rounded-lg'
                  }`}
                  title={!shouldShowExpanded ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${shouldShowExpanded ? 'mr-3' : ''}`} />
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    shouldShowExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-2 w-0'
                  }`}>
                    <div className="font-medium whitespace-nowrap">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{item.description}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {shouldShowExpanded ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className={`flex-1 transition-all duration-300 ease-in-out overflow-hidden ${
              shouldShowExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-2 w-0'
            }`}>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Security Officer</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center" title="John Doe - Security Officer">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
