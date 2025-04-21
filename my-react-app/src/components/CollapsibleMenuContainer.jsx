import React, { useState, useEffect } from 'react';
import CollapsibleMenu from './CollapsibleMenu';

const CollapsibleMenuContainer = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/Ybaronac/994b9084c9ebb6d773658ef497dab034/raw/269e938c2c2a7f4aec72d8aa10829920766a8456/IDE_Test.json');
        if (!response.ok) throw new Error('Failed to fetch JSON data');
        const data = await response.json();
        console.log('Datos cargados:', data);
        setMetrics(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="collapsible-menu-container">
      <h1 className="menu-title">Menú Colapsable</h1>
      <CollapsibleMenu data={metrics} />
    </div>
  );
};

export default CollapsibleMenuContainer;