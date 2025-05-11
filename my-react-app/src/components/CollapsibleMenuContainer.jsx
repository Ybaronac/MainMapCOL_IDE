import React, { useState, useEffect } from 'react';
import CollapsibleMenu from './CollapsibleMenu';
import PropTypes from 'prop-types';

const CollapsibleMenuContainer = ({ selectedYear, selectedDepartment }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredMetrics, setFilteredMetrics] = useState([]);
  const [departmentName, setDepartmentName] = useState('COLOMBIA'); // Estado para el nombre del departamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/Ybaronac/26018c1622e630cd970043a5f664ff46/raw/5df603fb5239b91d8316b215c47e32ffd10d91cb/DepartmentsItemsIDEperYearTest.json'
        );
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `Failed to fetch JSON data: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`
          );
        }
        const jsonData = await response.json();
        console.log('Datos cargados:', jsonData);
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const yearAsString = String(selectedYear); // Convertir a cadena
    // Determinar el departmentID
    let deptID = '0'; // Valor por defecto: COLOMBIA
    let tempDepartmentName = 'COLOMBIA';

    if (selectedDepartment) {
      if (typeof selectedDepartment === 'object' && selectedDepartment.properties && selectedDepartment.properties.DPTO_CCDGO) {
        deptID = String(selectedDepartment.properties.DPTO_CCDGO); // Extraer ID del objeto
        tempDepartmentName = selectedDepartment.properties.DPTO_CNMBR || 'Desconocido'; // Usar nombre del departamento
      } else if (typeof selectedDepartment === 'string') {
        deptID = selectedDepartment; // Usar directamente si es cadena
      }
    }

    console.log('selectedYear:', yearAsString);
    console.log('selectedDepartment:', deptID);
    console.log('departmentName:', tempDepartmentName);

    if (yearAsString && data.length > 0) {
      const departmentData = data.find(
        (d) => d.departmentID.toString() === deptID
      );
      console.log('departmentData:', departmentData);

      if (departmentData && departmentData.values[yearAsString]) {
        console.log('filteredMetrics:', [departmentData.values[yearAsString]]);
        setFilteredMetrics([departmentData.values[yearAsString]]);
        setDepartmentName(tempDepartmentName); // Actualizar nombre del departamento
      } else {
        setFilteredMetrics([]);
        setDepartmentName(tempDepartmentName); // Mantener nombre incluso si no hay datos
        console.log(`No hay datos para el año ${yearAsString} y el departamento ${deptID}`);
      }
    } else {
      setFilteredMetrics([]);
      setDepartmentName(tempDepartmentName);
    }
  }, [selectedYear, selectedDepartment, data]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="collapsible-menu-container p-4">
      <h1 className="menu-title text-2xl font-bold mb-4">Menú Colapsable</h1>
      {filteredMetrics.length === 0 ? (
        <div className="p-4 text-center">
          No hay datos disponibles para el año {selectedYear} y el departamento {departmentName}.
        </div>
      ) : (
        <CollapsibleMenu data={filteredMetrics} />
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
};

export default CollapsibleMenuContainer;