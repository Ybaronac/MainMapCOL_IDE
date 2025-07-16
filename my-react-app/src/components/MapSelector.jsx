import React, { useState } from 'react';
import '../styles/MapSelector.css';

const MapSelector = ({ onMapChange }) => {
  const [selectedMap, setSelectedMap] = useState('departments');

  const handleMapChange = (mapType) => {
    setSelectedMap(mapType);
    onMapChange(mapType);
  };

  return (
    <div className="map-selector">
      <button
        className={`map-selector-button ${selectedMap === 'departments' ? 'active' : ''}`}
        onClick={() => handleMapChange('departments')}
      >
        Departments Map
      </button>
      <button
        className={`map-selector-button ${selectedMap === 'etc' ? 'active' : ''}`}
        onClick={() => handleMapChange('etc')}
      >
        ETC Map
      </button>
    </div>
  );
};

export default MapSelector;