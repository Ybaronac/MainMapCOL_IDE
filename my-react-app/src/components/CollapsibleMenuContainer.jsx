import React, { useState, useEffect } from 'react';
import CollapsibleMenu from './CollapsibleMenu';
import PropTypes from 'prop-types';
import { labels } from '../config/config.js';
import { DEPARTMENTS_ITEMS } from '../config/configURLDataSource.js';

const CollapsibleMenuContainer = ({ selectedYear, selectedDepartment, selectedIndex }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [departmentName, setDepartmentName] = useState('COLOMBIA');


  const categoryKeysMap = {
    Disponibilidad: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22'],
    Accesibilidad: ['23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38'],
    Adaptabilidad: ['39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54'],
    Aceptabilidad: ['55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74']
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DEPARTMENTS_ITEMS);
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
  }, []);

  useEffect(() => {
    const yearAsString = String(selectedYear);
    let deptID = '0';
    let tempDepartmentName = 'COLOMBIA';

    if (selectedDepartment) {
      if (typeof selectedDepartment === 'object' && selectedDepartment.properties && selectedDepartment.properties.DPTO_CCDGO) {
        deptID = String(selectedDepartment.properties.DPTO_CCDGO);
        tempDepartmentName = selectedDepartment.properties.DPTO_CNMBR || 'Desconocido';
      } else if (typeof selectedDepartment === 'string') {
        deptID = selectedDepartment;
      }
    }
    console.log('deptID:', deptID, 'tempDepartmentName:', tempDepartmentName);

    if (yearAsString && data.length > 0) {
      const departmentData = data.find(
        (d) => String(d.departmentID).padStart(2, '0') === deptID || 
        String(d.departmentID) === deptID
      );

      if (departmentData && departmentData.values[yearAsString]) {
        let metrics = departmentData.values[yearAsString];

        if (selectedIndex > 0) {
          const categoryLabel = labels[selectedIndex];
          const categoryKeys = categoryKeysMap[categoryLabel] || [];
          console.log('categoryLabel:', categoryLabel, 'categoryKeys:', categoryKeys, 'metrics antes:', metrics);
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
        setDepartmentName(tempDepartmentName);
      } else {
        console.log('No se encontraron datos para deptID:', deptID, 'año:', yearAsString);
        setFilteredMetrics([]);
        setDepartmentName(tempDepartmentName);
      }
    } else {
      console.log('Datos no disponibles o año inválido:', yearAsString, data.length);
      setFilteredMetrics([]);
      setDepartmentName(tempDepartmentName);
    }
  }, [selectedYear, selectedDepartment, selectedIndex, data]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  console.log(filteredMetrics);
  return (
    <div className="collapsible-menu-container p-4">
      <h1 className="menu-title text-2xl font-bold mb-4">IDE: {departmentName} - {selectedYear} </h1>
      {filteredMetrics.length === 0 ? (
        <div className="p-4 text-center">
          No hay datos disponibles para el año {selectedYear} y el departamento {departmentName}.
        </div>
      ) : (
        <CollapsibleMenu data={filteredMetrics} selectedIndex={selectedIndex} />
      )}
    </div>
  );
};

CollapsibleMenuContainer.propTypes = {
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedDepartment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      properties: PropTypes.shape({
        DPTO_CCDGO: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        DPTO_CNMBR: PropTypes.string,
      }),
    }),
  ]),
  selectedIndex: PropTypes.number.isRequired,
};

export default CollapsibleMenuContainer;