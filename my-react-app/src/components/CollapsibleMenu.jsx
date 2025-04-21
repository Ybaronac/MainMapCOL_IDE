import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CollapsibleMenu = ({ data }) => {
  const [openSections, setOpenSections] = useState({});

  // Inicializar openSections recursivamente
  const initializeOpenSections = (obj, path = '') => {
    if (!obj) return {};
    const sections = {};
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      sections[currentPath] = false; // Inicializar como cerrado
      if (typeof value !== 'string') {
        const childSections = initializeOpenSections(value, currentPath);
        Object.assign(sections, childSections);
      }
    });
    return sections;
  };

  // Inicializar openSections al cargar los datos
  useEffect(() => {
    if (data && data[0]) {
      const initialSections = initializeOpenSections(data[0]);
      setOpenSections(initialSections);
    }
  }, [data]);

  // Manejar el toggle de una sección
  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Renderizar nodos recursivamente
  const renderNode = (obj, path = '', level = 0) => {
    if (!obj) return null;
    return Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      const isLeaf = typeof value === 'string' || (typeof value === 'object' && Object.keys(value).length === 0);
      const isOpen = openSections[currentPath] ?? false;

      // Depuración: Imprimir el nivel y el nombre del ítem
      console.log(`Rendering item: ${key}, Level: ${level}`);

      return (
        <div key={currentPath} style={{ marginLeft: `${level * 0.75}rem` }}>
          <div
            className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300`} // Línea gris en cada ítem
            onClick={() => !isLeaf && toggleSection(currentPath)}
          >
            <span className="w-8 flex-shrink-0 text-center text-sm">
              {isLeaf ? '•' : isOpen ? '⏷' : '⏵'}
            </span>
            <div className="flex justify-between w-full">
              <span
                className={level === 0 ? 'font-bold' : 'font-medium'}
                style={level === 0 ? { fontWeight: 'bold' } : {}} // Estilo en línea para asegurar negrita
              >
                {key}
              </span>
              {isLeaf && typeof value === 'string' && (
                <span className="text-gray-600 mr-[10px]">{value}</span>
              )}
            </div>
          </div>
          {!isLeaf && (
            <div
              style={{
                maxHeight: isOpen ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 300ms ease-in-out',
              }}
            >
              <div
                style={{
                  marginLeft: '0.75rem',
                  paddingLeft: '0.5rem',
                }}
              >
                {renderNode(value, currentPath, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="collapsible-menu p-2">
      {data && data[0] ? renderNode(data[0]) : <div>No hay datos disponibles</div>}
    </div>
  );
};

CollapsibleMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CollapsibleMenu;