import React, { useState, useEffect } from 'react';
import { GraduationCap, Landmark } from 'lucide-react';

const defaultUniversities = [
  {
    id: 'unal',
    name: 'Universidad Nacional de Colombia',
    logos: [
      {
        id: 'unal_dynamic',
        alt: 'Universidad Nacional de Colombia',
        lightCandidates: [
          `${import.meta.env.BASE_URL}logos/unalNEGRO.png`,
          `${import.meta.env.BASE_URL}logos/LogoUNAL_light.png`,
          `${import.meta.env.BASE_URL}logos/LogoUNAL.png`,
          `${import.meta.env.BASE_URL}logos/LogoUNAL.jpg`
        ],
        darkCandidates: [
          `${import.meta.env.BASE_URL}logos/unalBLANCO.png`,
          `${import.meta.env.BASE_URL}logos/LogoUNAL_dark.png`,
          `${import.meta.env.BASE_URL}logos/LogoUNAL_blanco.png`,
          `${import.meta.env.BASE_URL}logos/unalNEGRO.png`
        ],
        defaultIcon: <Landmark className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      },
      {
        id: 'unal_static',
        alt: 'Facultad de Ciencias Económicas',
        staticCandidates: [
          `${import.meta.env.BASE_URL}logos/Facultad-de-Ciencias-Economicas.png`,
          `${import.meta.env.BASE_URL}logos/escudoUnal.png`
        ],
        defaultIcon: <Landmark className="w-10 h-10 text-blue-500 dark:text-blue-300" />
      }
    ]
  },
  {
    id: 'javeriana',
    name: 'Pontificia Universidad Javeriana',
    logos: [
      {
        id: 'javeriana_dynamic',
        alt: 'Pontificia Universidad Javeriana',
        lightCandidates: [
          `${import.meta.env.BASE_URL}logos/LLE+JAVE NUEVO H (1).png`,
          `${import.meta.env.BASE_URL}logos/LogoJAVERIANA_Light.png`,
          `${import.meta.env.BASE_URL}logos/LogoJAVERIANA.png`,
          `${import.meta.env.BASE_URL}logos/LogoJaveriana.png`
        ],
        darkCandidates: [
          `${import.meta.env.BASE_URL}logos/LLE+JAVE NUEVO H copia - BLANCO (1).png`,
          `${import.meta.env.BASE_URL}logos/LogoJAVERIANA_dark.png`,
          `${import.meta.env.BASE_URL}logos/LogoJAVERIANA_blanco.png`,
          `${import.meta.env.BASE_URL}logos/LLE+JAVE NUEVO H (1).png`
        ],
        defaultIcon: <GraduationCap className="w-10 h-10 text-amber-600 dark:text-amber-400" />
      }
    ]
  }
];

const LogoImage = ({ item, isDark, uniId }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const key = item.staticCandidates ? 'static' : (isDark ? 'dark' : 'light');
  const candidates = item.staticCandidates
    ? item.staticCandidates
    : (isDark ? (item.darkCandidates || item.lightCandidates) : item.lightCandidates);

  const currentSrc = candidates[candidateIndex];
  const isFailed = candidateIndex >= (candidates ? candidates.length : 0);

  useEffect(() => {
    setCandidateIndex(0);
  }, [isDark]);

  const handleError = () => {
    setCandidateIndex((prev) => prev + 1);
  };

  if (isFailed || !currentSrc) {
    return (
      <div style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {item.defaultIcon}
      </div>
    );
  }

  const isUnalDynamic = item.id === 'unal_dynamic';
  const isUnalStatic = item.id === 'unal_static';
  const isUnal = uniId === 'unal' || item.id.includes('unal');

  const imgHeight = isUnalDynamic ? '175px' : (isUnalStatic ? '195px' : '320px');
  const imgMaxHeight = isUnalDynamic ? '205px' : (isUnalStatic ? '230px' : '380px');
  const imgMaxWidth = isUnalDynamic ? '350px' : (isUnalStatic ? '390px' : '650px');

  return (
    <img
      key={`${item.id}_${key}_${candidateIndex}`}
      src={currentSrc}
      alt={item.alt}
      onError={handleError}
      style={{
        height: imgHeight,
        maxHeight: imgMaxHeight,
        width: 'auto',
        maxWidth: imgMaxWidth,
        objectFit: 'contain',
        filter: 'none',
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

const UniversityLogos = ({ universities = defaultUniversities }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="w-full py-10 mt-6 transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#000000' : 'transparent' }}
    >
      <div
        className="w-full max-w-7xl mx-auto px-6 py-8 rounded-2xl transition-colors duration-300"
        style={{ backgroundColor: isDark ? '#000000' : 'transparent' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4rem',
            width: '100%',
            flexWrap: 'wrap'
          }}
        >
          {universities.map((uni) => (
            <div
              key={uni.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: uni.id === 'unal' ? '0px' : '2rem'
              }}
            >
              {uni.logos.map((logoItem, idx) => (
                <div
                  key={logoItem.id}
                  style={{
                    margin: 0,
                    padding: 0,
                    marginLeft: (uni.id === 'unal' && idx > 0) ? '-1rem' : '0'
                  }}
                >
                  <LogoImage item={logoItem} isDark={isDark} uniId={uni.id} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos;
