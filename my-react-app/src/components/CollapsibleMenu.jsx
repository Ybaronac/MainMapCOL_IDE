import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { labels } from '../config/config.js';

const CollapsibleMenu = ({ data,selectedIndex }) => {
  const [openSections, setOpenSections] = useState({});
  const [textJson, setTextJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar el JSON de texto desde la URL
  useEffect(() => {
    const fetchTextJson = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/Ybaronac/13ade4e7376c56e3b5b9ae439cfa9439/raw/b775c91fbd47acc2a9c031b550cb05be2d643e8f/ItemsIDE.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch text JSON: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setTextJson(jsonData[0]); // El JSON es un array, tomamos el primer objeto
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTextJson();
  }, []);

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

  // Filtrar textJson según selectedIndex
  const filterTextJson = (textJson) => {
    if (!textJson) return null;
    if (selectedIndex === 0) return textJson; // Mostrar todo para "General"
    const categoryLabel = labels[selectedIndex]; // Ej. "Disponibilidad"
    if (textJson[categoryLabel]) {
      return { [categoryLabel]: textJson[categoryLabel] }; // Mostrar solo la sección correspondiente
    }
    console.log(`Sección ${categoryLabel} no encontrada en textJson`);
    return {};
  };

  // Inicializar openSections cuando textJson esté disponible
  useEffect(() => {
    if (textJson) {
      const filteredTextJson = filterTextJson(textJson);
      const initialSections = initializeOpenSections(filteredTextJson);
      setOpenSections(initialSections);
    }
  }, [textJson,selectedIndex]);

  // Manejar el toggle de una sección
  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Sustituir los IDs en el JSON de texto con los valores reales
  const replaceValues = (textObj, values) => {
    if (!values || !textObj) return textObj;
    const result = JSON.parse(JSON.stringify(textObj)); // Clonar el objeto
    const replaceInObject = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          // Reemplazar {ID} con el valor correspondiente
          obj[key] = obj[key].replace(/{(\d+)}/g, (match, id) => values[id] || match);
          // Reemplazar {info} con el grado correspondiente (Saber 5, 11, etc.)
          obj[key] = obj[key].replace(/{info}/g, (match) => {
            if (obj[key].includes('Saber 5')) return '5';
            if (obj[key].includes('Saber 11')) return '11';
            return 'Unknown';
          });
        } else if (typeof obj[key] === 'object') {
          replaceInObject(obj[key]);
        }
      });
    };
    replaceInObject(result);
    return result;
  };

  // Renderizar nodos recursivamente
  const renderNode = (obj, path = '', level = 0) => {
    if (!obj) return null;
    return Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      const isLeaf = typeof value === 'string';
      const isOpen = openSections[currentPath] ?? false;

      return (
        <div key={currentPath} style={{ marginLeft: `${level * 0.75}rem` }}>
          <div
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-300"
            onClick={() => !isLeaf && toggleSection(currentPath)}
          >
            <span className="w-8 flex-shrink-0 text-center text-sm">
              {isLeaf ? '•' : isOpen ? '⏷' : '⏵'}
            </span>
            <div className="flex justify-between w-full">
              <span
                className={level === 0 ? 'font-bold' : 'font-medium'}
                style={level === 0 ? { fontWeight: 'bold' } : {}}
              >
                {key}
              </span>
              {isLeaf && <span className="text-gray-600 mr-[10px]">{value}</span>}
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
              <div style={{ marginLeft: '0.75rem', paddingLeft: '0.5rem' }}>
                {renderNode(value, currentPath, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  // Combinar el JSON de texto con los valores
  const filteredTextJson = filterTextJson(textJson);
  const combinedData = filteredTextJson && data[0] ? replaceValues(filteredTextJson, data[0]) : null;

  if (loading) return <div className="p-2 text-center">Loading text JSON...</div>;
  if (error) return <div className="p-2 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="collapsible-menu p-2">
      {combinedData ? (
        renderNode(combinedData)
      ) : (
        <div>No hay datos disponibles</div>
      )}
    </div>
  );
};

CollapsibleMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default CollapsibleMenu;