import React from 'react';

const MapSelector = ({ selectedDataType, onDataTypeChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => onDataTypeChange('ETC')}
        style={{
          padding: '10px 20px',
          marginRight: '10px',
          backgroundColor: selectedDataType === 'ETC' ? '#007bff' : '#f8f9fa',
          color: selectedDataType === 'ETC' ? '#fff' : '#000',
          border: '1px solid #007bff',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Mapa de ETC
      </button>
      <button
        onClick={() => onDataTypeChange('DEPARTMENTS')}
        style={{
          padding: '10px 20px',
          backgroundColor: selectedDataType === 'DEPARTMENTS' ? '#007bff' : '#f8f9fa',
          color: selectedDataType === 'DEPARTMENTS' ? '#fff' : '#000',
          border: '1px solid #007bff',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Mapa de Departamentos
      </button>
    </div>
  );
};

export default MapSelector;