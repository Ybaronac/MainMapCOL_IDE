import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// JSON de texto con IDs
const TEXT_JSON = [
  {
    Disponibilidad: {
      'Relación alumno-docente': {
        'Relación alumno-docente - preescolar': '{1}',
        'Relación alumno-docente - primaria': '{2}',
        'Relación alumno-docente - secundaria': '{3}',
        'Relación alumno-docente - media': '{4}',
      },
      'Docentes con formación mínima': {
        'Porcentaje de docentes con pregrado - preescolar': '{5}',
        'Porcentaje de docentes con pregrado - primaria': '{6}',
        'Porcentaje de docentes con pregrado - secundaria': '{7}',
        'Porcentaje de docentes con pregrado - media': '{8}',
      },
      'Relación alumno - aula': {
        'Relación alumno - aula - preescolar': '{9}',
        'Relación alumno - aula - primaria': '{10}',
        'Relación alumno - aula - secundaria': '{11}',
        'Relación alumno - aula - media': '{12}',
      },
      'Matrícula jornada única o completa': {
        'Porcentaje de matrícula en jornada única o completa - preescolar': '{13}',
        'Porcentaje de matrícula en jornada única o completa - primaria': '{14}',
        'Porcentaje de matrícula en jornada única o completa - secundaria': '{15}',
        'Porcentaje de matrícula en jornada única o completa - media': '{16}',
      },
      'Tecnología de la información': {
        'Relación alumno-computador': '{17}',
        'Porcentaje alumnos con acceso a internet en sedes educativas': '{18}',
      },
      Financiación: {
        'Gasto por estudiantes - preescolar': '{19}',
        'Gasto por estudiantes - primaria': '{20}',
        'Gasto por estudiantes - secundaria': '{21}',
        'Gasto por estudiantes - media': '{22}',
      },
    },
    Accesibilidad: {
      'Brecha sector oficial mujer-hombre': {
        'Brecha tasa de deserción sector oficial mujer-hombre': '{23}',
        'Brecha tasa de reprobación sector oficial mujer-hombre': '{24}',
        'Brecha Saber 11 sector oficial mujer-hombre': '{25}',
        'Brecha tasa de extraedad sector oficial mujer-hombre': '{26}',
      },
      'Brecha sector oficial zona rural-urbana': {
        'Brecha tasa de deserción sector oficial zona rural-urbana': '{27}',
        'Brecha tasa de reprobación sector oficial zona rural-urbana': '{28}',
        'Brecha Saber 11 sector oficial zona rural-urbana': '{29}',
        'Brecha jornada única sector oficial zona rural-urbana': '{30}',
        'Brecha tasa de extraedad sector oficial zona rural-urbana': '{31}',
        'Brecha docentes mínima formación sector oficial zona rural-urbana': '{32}',
      },
      'Brecha sector oficial-no oficial': {
        'Brecha tasa de deserción sector oficial-no oficial': '{33}',
        'Brecha tasa de reprobación sector oficial-no oficial': '{34}',
        'Brecha Saber 11 sector oficial-no oficial': '{35}',
        'Brecha jornada única sector oficial-no oficial': '{36}',
        'Brecha tasa de extraedad sector oficial-no oficial': '{37}',
        'Brecha docentes mínima formación sector oficial-no oficial': '{38}',
      },
    },
    Adaptabilidad: {
      Deserción: {
        'Tasa de deserción intra-anual - Preescolar': '{39}',
        'Tasa de deserción intra-anual - Primaria': '{40}',
        'Tasa de deserción intra-anual - Secundaria': '{41}',
        'Tasa de deserción intra-anual - Media': '{42}',
        'Tasa de deserción interanual - Preescolar': '{43}',
        'Tasa de deserción interanual - Primaria': '{44}',
        'Tasa de deserción inter-anual - Secundaria': '{45}',
        'Tasa de deserción inter-anual - Media': '{46}',
      },
      Extraedad: {
        'Tasa de extraedad - Preescolar': '{47}',
        'Tasa de extraedad - Primaria': '{48}',
        'Tasa de extraedad - Secundaria': '{49}',
        'Tasa de extraedad - Media': '{50}',
      },
      Aprobación: {
        'Tasa de aprobación - Preescolar': '{51}',
        'Tasa de aprobación - Primaria': '{52}',
        'Tasa de aprobación - Secundaria': '{53}',
        'Tasa de aprobación - Media': '{54}',
      },
    },
    Aceptabilidad: {
      'Formación docente de alto nivel': {
        'Porcentaje de docentes con posgrado - Preescolar': '{55}',
        'Porcentaje de docentes con posgrado - primaria': '{56}',
        'Porcentaje de docentes con posgrado - secundaria': '{57}',
        'Porcentaje de docentes con posgrado - media': '{58}',
      },
      'Desempeño en pruebas oficiales': {
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 3 - Matematicas': '{59}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 3 - Lenguaje': '{60}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 5 - Matematicas': '{61}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 5 - Lenguaje': '{62}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 9 - Matematicas': '{63}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 9 - Lenguaje': '{64}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 11 - Matematicas': '{65}',
        'Porcentaje de estudiantes en desempeño esperado en pruebas Saber 11 - Lenguaje': '{66}',
      },
      'Docentes de carrera': {
        'Porcentaje de docentes de carrera - Preescolar': '{67}',
        'Porcentaje de docentes de carrera - Primaria': '{68}',
        'Porcentaje de docentes de carrera - Secundaria': '{69}',
        'Porcentaje de docentes de carrera - Media': '{70}',
      },
      'Infraestrutura adecuada': {
        'Porcentaje de estudiantes matriculados en IE con infraestrutura adecuada - Preescolar': '{71}',
        'Porcentaje de estudiantes matriculados en IE con infraestrutura adecuada - Primaria': '{72}',
        'Porcentaje de estudiantes matriculados en IE con infraestrutura adecuada - Secundaria': '{73}',
        'Porcentaje de estudiantes matriculados en IE con infraestrutura adecuada - Media': '{74}',
      },
    },
  },
];

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
    const initialSections = initializeOpenSections(TEXT_JSON[0]);
    setOpenSections(initialSections);
  }, []);

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
  const combinedData = data[0] ? replaceValues(TEXT_JSON[0], data[0]) : null;

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
};

export default CollapsibleMenu;