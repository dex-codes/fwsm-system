import { MapPin, Clock, Wifi, WifiOff, Wrench, Play, Maximize } from 'lucide-react';
import { useState } from 'react';

interface Camera {
  id: number;
  name: string;
  location: string;
  client: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
  thumbnail: string;
}

interface CameraCardProps {
  camera: Camera;
  viewMode: 'grid' | 'list';
}

const CameraCard = ({ camera, viewMode }: CameraCardProps) => {
  const [imageError, setImageError] = useState(false);

  const renderThumbnail = (size: 'small' | 'large') => {
    const logoSize = size === 'small' ? 'w-8 h-8' : 'w-16 h-16';
    const showPlaceholder = camera.status !== 'online' || imageError || !camera.thumbnail;

    if (showPlaceholder) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <img
            src="/resruve-logo-no-bg.png"
            alt="No Feed"
            className={`${logoSize} object-contain opacity-20`}
          />
        </div>
      );
    }

    return (
      <img
        src={camera.thumbnail}
        alt={camera.name}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    );
  };

  const getStatusIcon = () => {
    switch (camera.status) {
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

  const getStatusColor = () => {
    switch (camera.status) {
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

  if (viewMode === 'list') {
    return (
      <div className="camera-card p-4">
        <div className="flex items-center space-x-4">
          {/* Thumbnail */}
          <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {renderThumbnail('small')}
            {camera.status === 'online' && !imageError && camera.thumbnail && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-6 h-6 text-white" />
              </div>
            )}
          </div>

          {/* Camera Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{camera.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
                {camera.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{camera.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{camera.lastSeen}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{camera.client}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="camera-card">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {renderThumbnail('large')}

        {/* Status Indicator */}
        <div className="absolute top-2 left-2">
          <div className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(camera.status)}`}>
            {camera.status}
          </div>
        </div>

        {/* Play Overlay */}
        {camera.status === 'online' && !imageError && camera.thumbnail && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <Play className="w-12 h-12 text-white" />
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button className="p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{camera.name}</h3>
          {getStatusIcon()}
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{camera.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{camera.lastSeen}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700">{camera.client}</p>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;
