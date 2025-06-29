import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type PersonaType = 'security-officer' | 'supervisor' | 'client' | 'admin' | 'super-admin';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  shortName: string;
  description: string;
  availableRoutes: string[];
  permissions: string[];
}

const personaConfigs: Record<PersonaType, PersonaConfig> = {
  'security-officer': {
    id: 'security-officer',
    name: 'Security Officer',
    shortName: 'SecOf',
    description: 'Monitor assigned cameras and create events',
    availableRoutes: ['/dashboard', '/alerts', '/settings'],
    permissions: [
      'view_assigned_cameras',
      'create_events',
      'modify_events',
      'delete_events',
      'alert_sos',
      'chat_supervisors'
    ]
  },
  'supervisor': {
    id: 'supervisor',
    name: 'Supervisor',
    shortName: 'Supervisor',
    description: 'Oversee security officers and stores',
    availableRoutes: ['/dashboard', '/cameras', '/reports', '/alerts', '/settings'],
    permissions: [
      'view_all_cameras',
      'review_events',
      'chat_security_officers',
      'chat_store_owners',
      'manage_assigned_stores'
    ]
  },
  'client': {
    id: 'client',
    name: 'Store Owner',
    shortName: 'Client',
    description: 'View store dashboards and reports',
    availableRoutes: ['/dashboard', '/reports', '/settings'],
    permissions: [
      'view_own_stores',
      'view_dashboards',
      'view_reports',
      'chat_supervisors'
    ]
  },
  'admin': {
    id: 'admin',
    name: 'Administrator',
    shortName: 'Admin',
    description: 'Manage users and view all data',
    availableRoutes: ['/dashboard', '/clients', '/cameras', '/reports', '/users', '/alerts', '/settings'],
    permissions: [
      'create_users',
      'modify_users',
      'delete_users',
      'view_all_dashboards',
      'view_all_reports',
      'view_logs',
      'assume_roles'
    ]
  },
  'super-admin': {
    id: 'super-admin',
    name: 'Super Administrator',
    shortName: 'SuperAdmin',
    description: 'Full system access and control',
    availableRoutes: ['/dashboard', '/clients', '/cameras', '/reports', '/users', '/alerts', '/settings'],
    permissions: [
      'create_any_role',
      'modify_any_role',
      'delete_any_role',
      'view_all_dashboards',
      'view_all_reports',
      'view_all_logs',
      'full_system_access'
    ]
  }
};

interface PersonaContextType {
  currentPersona: PersonaType;
  personaConfig: PersonaConfig;
  setPersona: (persona: PersonaType) => void;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
  getAllPersonas: () => PersonaConfig[];
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};

interface PersonaProviderProps {
  children: ReactNode;
}

export const PersonaProvider = ({ children }: PersonaProviderProps) => {
  const [currentPersona, setCurrentPersona] = useState<PersonaType>(() => {
    // Check localStorage first, then default to admin for development
    const saved = localStorage.getItem('currentPersona');
    if (saved && saved in personaConfigs) {
      return saved as PersonaType;
    }
    return 'admin'; // Default to admin for development
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('currentPersona', currentPersona);
  }, [currentPersona]);

  const personaConfig = personaConfigs[currentPersona];

  const setPersona = (persona: PersonaType) => {
    setCurrentPersona(persona);
  };

  const hasPermission = (permission: string): boolean => {
    return personaConfig.permissions.includes(permission);
  };

  const canAccessRoute = (route: string): boolean => {
    return personaConfig.availableRoutes.includes(route);
  };

  const getAllPersonas = (): PersonaConfig[] => {
    return Object.values(personaConfigs);
  };

  return (
    <PersonaContext.Provider value={{
      currentPersona,
      personaConfig,
      setPersona,
      hasPermission,
      canAccessRoute,
      getAllPersonas
    }}>
      {children}
    </PersonaContext.Provider>
  );
};
