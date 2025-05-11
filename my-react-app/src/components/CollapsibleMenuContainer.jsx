import React, { useState, useEffect } from 'react';
import CollapsibleMenu from './CollapsibleMenu';

const CollapsibleMenuContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredMetrics, setFilteredMetrics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/Ybaronac/26018c1622e630cd970043a5f664ff46/raw/5df603fb5239b91d8316b215c47e32ffd10d91cb/DepartmentsItemsIDEperYearTest.json'); 
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch JSON data: ${response.status} ${response.statusText} - ${text.slice(0, 100)}...`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
        if (jsonData.length > 0) {
          setSelectedDepartment(jsonData[0].departmentID.toString());
          const years = Object.keys(jsonData[0].values);
          setSelectedYear(years[0]);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear && selectedDepartment && data.length > 0) {
      const departmentData = data.find(
        (d) => d.departmentID.toString() === selectedDepartment
      );
      if (departmentData && departmentData.values[selectedYear]) {
        setFilteredMetrics([departmentData.values[selectedYear]]);
      } else {
        setFilteredMetrics([]);
      }
    }
  }, [selectedYear, selectedDepartment, data]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  const departments = data.map((d) => ({
    id: d.departmentID,
    name: d.departmentName,
  }));
  const years = data.length > 0 ? Object.keys(data[0].values) : [];

  return (
    <div className="collapsible-menu-container p-4">
      <h1 className="menu-title text-2xl font-bold mb-4">Menú Colapsable</h1>
      <div className="filters mb-4 flex gap-4">
        <div>
          <label className="block mb-1">Departamento:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Año:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <CollapsibleMenu data={filteredMetrics} />
    </div>
  );
};

export default CollapsibleMenuContainer;