import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { usePersona } from '../contexts/PersonaContext';
import { Shield, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoute?: string;
}

const ProtectedRoute = ({ children, requiredRoute }: ProtectedRouteProps) => {
  const { canAccessRoute, personaConfig } = usePersona();
  const location = useLocation();
  
  const currentRoute = requiredRoute || location.pathname;
  
  // Check if the current persona can access this route
  if (!canAccessRoute(currentRoute)) {
    // Find the first available route for this persona to redirect to
    const firstAvailableRoute = personaConfig.availableRoutes[0] || '/dashboard';
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Access Restricted
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your current role <strong>{personaConfig.name}</strong> does not have permission to access this page.
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Available Pages:</span>
            </div>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
              {personaConfig.availableRoutes.map((route) => (
                <li key={route} className="flex items-center space-x-2">
                  <span>•</span>
                  <span>
                    {route.replace('/', '').charAt(0).toUpperCase() + route.replace('/', '').slice(1) || 'Dashboard'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={() => window.location.href = firstAvailableRoute}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go to {firstAvailableRoute.replace('/', '').charAt(0).toUpperCase() + firstAvailableRoute.replace('/', '').slice(1) || 'Dashboard'}
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
