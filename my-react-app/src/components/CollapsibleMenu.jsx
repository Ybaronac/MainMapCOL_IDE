import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosSquare, IoIosRadioButtonOn } from 'react-icons/io';
import { labels, generalColours, traficLightColours } from '../config/config.js';
import { ITEMS_IDE } from '../config/configURLDataSource.js';

const CollapsibleMenu = ({ data,selectedIndex }) => {
  const [openSections, setOpenSections] = useState({});
  const [textJson, setTextJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTextJson = async () => {
      try {
        const response = await fetch(ITEMS_IDE);
        if (!response.ok) {
          throw new Error(`Failed to fetch text JSON: ${response.status} ${response.statusText}`);
        }
        const jsonData = await response.json();
        setTextJson(jsonData[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTextJson();
  }, []);

  const initializeOpenSections = (obj, path = '') => {
    if (!obj) return {};
    const sections = {};
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      sections[currentPath] = false; 
      if (typeof value !== 'string') {
        const childSections = initializeOpenSections(value, currentPath);
        Object.assign(sections, childSections);
      }
    });
    return sections;
  };

  const filterTextJson = (textJson) => {
    if (!textJson) return null;
    if (selectedIndex === 0) return textJson;
    const categoryLabel = labels[selectedIndex];
    if (textJson[categoryLabel]) {
      return { [categoryLabel]: textJson[categoryLabel] };
    }
    console.log(`Sección ${categoryLabel} no encontrada en textJson`);
    return {};
  };

  useEffect(() => {
    if (textJson) {
      const filteredTextJson = filterTextJson(textJson);
      const initialSections = initializeOpenSections(filteredTextJson);
      setOpenSections(initialSections);
    }
  }, [textJson,selectedIndex]);

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const replaceValues = (textObj, values) => {
    if (!values || !textObj) return textObj;
    const result = JSON.parse(JSON.stringify(textObj)); 
    const replaceInObject = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].replace(/{(\d+)}/g, (match, id) => values[id] || match);
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

  const getValueColor = (value) => {
    // Extract numeric value (e.g., "75%" -> 75)
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return { red: false, yellow: false, green: false };

    if (numericValue >= 0 && numericValue <= 50) {
      return { red: true, yellow: false, green: false };
    } else if (numericValue >= 51 && numericValue <= 75) {
      return { red: false, yellow: true, green: false };
    } else if (numericValue >= 76 && numericValue <= 100) {
      return { red: false, yellow: false, green: true };
    }
    return { red: false, yellow: false, green: false };
  };

  const renderNode = (obj, path = '', level = 0) => {
    if (!obj) return null;
    return Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      const isLeaf = typeof value === 'string';
      const isOpen = openSections[currentPath] ?? false;

      let iconColor = '#000'; 
      if (level === 0 && !isLeaf) {
        if (selectedIndex === 0) {
          const labelIndex = labels.indexOf(key);
          iconColor = labelIndex !== -1 ? generalColours[labelIndex] : '#000';
        } else {
          iconColor = generalColours[selectedIndex] || '#000';
        }
      }

      const iconStates = isLeaf ? getValueColor(value) : { red: false, yellow: false, green: false };

      return (
        <div key={currentPath} className="mx-2" style={{ marginLeft: `${level * 0.75}rem` }}>
          <div
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer menu-node"
            onClick={() => !isLeaf && toggleSection(currentPath)}
          >
            <div className="flex items-center w-8 flex-shrink-0">
              {level === 0 && !isLeaf ? (
                <IoIosSquare
                  className="text-sm"
                  style={{ color: iconColor }}
                />
              ) : null}

            {isLeaf && (
                <div className="flex space-x-1">
                <IoIosRadioButtonOn
                  className="text-sm"
                  style={{
                    color: traficLightColours[0],
                    opacity: iconStates.red ? 1 : 0.1,
                    border: '1px solid black',
                    borderColor: '#e5e7eb',
                    borderRadius: '50%',
                  }}
                />
                <IoIosRadioButtonOn
                  className="text-sm"
                  style={{
                    color: traficLightColours[1],
                    opacity: iconStates.yellow ? 1 : 0.1,
                    border: '1px solid black',
                    borderColor: '#e5e7eb',
                    borderRadius: '50%',
                  }}
                />
                <IoIosRadioButtonOn
                  className="text-sm"
                  style={{
                    color: traficLightColours[2],
                    opacity: iconStates.green ? 1 : 0.1,
                    border: '1px solid black',
                    borderColor: '#e5e7eb',
                    borderRadius: '50%',
                  }}
                />
                </div>
              )}														 
				
            </div>
            <div className="flex justify-between items-center w-full">
              <span
                className={level === 0 ? 'font-bold' : 'font-medium'}
                style={level === 0 ? { fontWeight: 'bold' } : {}}
              >
                {key}
              </span>
              {isLeaf ? (
                <span className="text-gray-600 mr-[10px]">{value}</span>
              ) : level <= 1 ? (
                <span className="ml-auto text-sm">{isOpen ? '⏷' : '⏵'}</span>
              ) : null}
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