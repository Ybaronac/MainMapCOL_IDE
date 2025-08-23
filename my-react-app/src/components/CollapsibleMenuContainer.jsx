import React, { useState, useEffect } from 'react';
import CollapsibleMenu from './CollapsibleMenu';
import PropTypes from 'prop-types';
import { labels } from '../config/config.js';
import { DEPARTMENTS_ITEMS, ETC_ITEMS } from '../config/configURLDataSource.js';

const CollapsibleMenuContainer = ({ selectedYear, selectedRegion, selectedIndex, dataType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [departmentName, setDepartmentName] = useState('COLOMBIA');

  const config = {
    ETC: {
      url: ETC_ITEMS,
      idProperty: 'CODIGO_ETC',
      nameProperty: 'ETC',
    },
    DEPARTMENTS: {
      url: DEPARTMENTS_ITEMS,
      idProperty: 'departmentID',
      nameProperty: 'DPTO_CNMBR',
    },
  };


  const categoryKeysMap = {
    Disponibilidad: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
    Accesibilidad: ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
    Adaptabilidad: ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69'],
    Aceptabilidad: ['70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94']
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config[dataType].url);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `Failed to fetch JSON data: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`
          );
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [dataType]);

  useEffect(() => {
    const yearAsString = String(selectedYear);
    let regionID = '0';
    let tempRegionName = 'COLOMBIA';

    if (selectedRegion) {
      if (typeof selectedRegion === 'object' && selectedRegion.properties && selectedRegion.properties[config[dataType].idProperty]) {
        regionID = String(selectedRegion.properties[config[dataType].idProperty]);
        tempRegionName = selectedRegion.properties[config[dataType].nameProperty] || 'Desconocido';
      } else if (typeof selectedRegion === 'string') {
        regionID = selectedRegion;
      }
    }

    if (yearAsString && data.length > 0) {
      const regionData = data.find(
        (d) => String(d[config[dataType].idProperty]).padStart(2, '0') === regionID || String(d[config[dataType].idProperty]) === regionID,
      );
      
      if (regionData && regionData.values[yearAsString]) {
        let metrics = regionData.values[yearAsString];

        if (selectedIndex > 0) {
          const categoryLabel = labels[selectedIndex];
          const categoryKeys = categoryKeysMap[categoryLabel] || [];
          if (categoryKeys.length > 0) {
            metrics = categoryKeys.reduce((acc, key) => {
              if (metrics[key] !== undefined) {
                acc[key] = metrics[key];
              }
              return acc;
            }, {});
          } else {
            metrics = {};
          }
        }
        setFilteredMetrics([metrics]);
        setDepartmentName(tempRegionName);
      } else {
        setFilteredMetrics([]);
        setDepartmentName(tempRegionName);
      }
    } else {
      setFilteredMetrics([]);
      setDepartmentName(tempRegionName);
    }
      }, [selectedYear, selectedRegion, selectedIndex, data, dataType]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  return (
    <div className="collapsible-menu-container p-4">
      <h1 className="menu-title text-2xl font-bold mb-4">IDE: {departmentName} - {selectedYear} </h1>
      {filteredMetrics.length === 0 ? (
        <div className="p-4 text-center">
          No hay datos disponibles para el año {selectedYear} y la región {departmentName}.
        </div>
      ) : (
        <CollapsibleMenu data={filteredMetrics} selectedIndex={selectedIndex} />
      )}
    </div>
  );
};

CollapsibleMenuContainer.propTypes = {
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedRegion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      properties: PropTypes.shape({
        CODIGO_ETC: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DPTO_CCDGO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ETC: PropTypes.string,
        DPTO_CNMBR: PropTypes.string,
      }),
    }),
  ]),
  selectedIndex: PropTypes.number.isRequired,
  dataType: PropTypes.oneOf(['ETC', 'DEPARTMENTS']).isRequired,
};

export default CollapsibleMenuContainer;