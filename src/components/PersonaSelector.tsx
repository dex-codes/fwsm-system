import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Shield, Crown, Building, Eye } from 'lucide-react';
import { usePersona, type PersonaType } from '../contexts/PersonaContext';

const PersonaSelector = () => {
  const { currentPersona, personaConfig, setPersona, getAllPersonas } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const personas = getAllPersonas();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getPersonaIcon = (personaId: PersonaType) => {
    switch (personaId) {
      case 'security-officer':
        return <Shield className="w-4 h-4" />;
      case 'supervisor':
        return <Eye className="w-4 h-4" />;
      case 'client':
        return <Building className="w-4 h-4" />;
      case 'admin':
        return <User className="w-4 h-4" />;
      case 'super-admin':
        return <Crown className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getPersonaColor = (personaId: PersonaType) => {
    switch (personaId) {
      case 'security-officer':
        return 'text-blue-600 bg-blue-100';
      case 'supervisor':
        return 'text-green-600 bg-green-100';
      case 'client':
        return 'text-purple-600 bg-purple-100';
      case 'admin':
        return 'text-orange-600 bg-orange-100';
      case 'super-admin':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handlePersonaChange = (personaId: PersonaType) => {
    setPersona(personaId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Persona Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className={`p-2 rounded-full ${getPersonaColor(currentPersona)}`}>
          {getPersonaIcon(currentPersona)}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {personaConfig.shortName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {personaConfig.name}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Select Persona / Role</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Switch between different user roles to test functionality
            </p>
          </div>
          
          <div className="py-2">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaChange(persona.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentPersona === persona.id ? 'bg-primary-50 dark:bg-primary-900' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${getPersonaColor(persona.id)}`}>
                  {getPersonaIcon(persona.id)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {persona.name}
                    </span>
                    {currentPersona === persona.id && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {persona.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {persona.availableRoutes.slice(0, 3).map((route) => (
                      <span
                        key={route}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        {route.replace('/', '').charAt(0).toUpperCase() + route.replace('/', '').slice(1) || 'Dashboard'}
                      </span>
                    ))}
                    {persona.availableRoutes.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{persona.availableRoutes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
