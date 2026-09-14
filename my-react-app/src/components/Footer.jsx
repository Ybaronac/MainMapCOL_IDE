import React, { useState } from 'react';
import WebpageContent from '../config/WebpageContent';

const FooterLogo = ({ candidates, alt, imgClassName }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const currentSrc = candidates[candidateIndex];

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    }
  };

  if (!currentSrc) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={imgClassName || "h-10 sm:h-12 md:h-14 w-auto max-w-[140px] sm:max-w-[200px] md:max-w-[260px] object-contain shrink-0"}
      style={{ border: 'none', outline: 'none' }}
    />
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const uni1Candidates = [
    `${import.meta.env.BASE_URL}logos/unalBLANCO.png`,
    `${import.meta.env.BASE_URL}logos/LogoUNAL_dark.png`,
    `${import.meta.env.BASE_URL}logos/unalNEGRO.png`
  ];

  const uni2Candidates = [
    `${import.meta.env.BASE_URL}logos/LLE+JAVE NUEVO H copia - BLANCO (1).png`,
    `${import.meta.env.BASE_URL}logos/LogoJAVERIANA_dark.png`,
    `${import.meta.env.BASE_URL}logos/LLE+JAVE NUEVO H (1).png`
  ];

  return (
    <footer
      className="footer bg-black text-gray-300 w-full py-8 px-6"
      style={{ backgroundColor: '#000000', color: '#d1d5db', border: 'none', outline: 'none' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center justify-items-center pb-6 px-2">

        {/* Universidad 1 - Columna Izquierda (Centrada en su columna, Logo + Texto en línea) */}
        <div className="flex flex-row items-center gap-3 sm:gap-4 text-left">
          <FooterLogo
            candidates={uni1Candidates}
            alt="Universidad Nacional de Colombia"
            imgClassName="h-10 sm:h-12 md:h-14 w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[220px] object-contain shrink-0"
          />
          <div className="flex flex-col">
            <p className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: '#e5e7eb' }}>
              {WebpageContent.footer_uni1_title || "Facultad de Ciencias Económicas"}
            </p>
            <a
              href={`mailto:${WebpageContent.footer_uni1_email || "viceinvfce_bog@unal.edu.co"}`}
              className="text-gray-400 hover:text-white text-[11px] sm:text-xs transition-colors"
              style={{ color: '#9ca3af' }}
            >
              {WebpageContent.footer_uni1_email || "viceinvfce_bog@unal.edu.co"}
            </a>
          </div>
        </div>

        {/* Universidad 2 - Columna Derecha (Centrada en su columna, Logo ampliado + Texto en línea) */}
        <div className="flex flex-row items-center gap-3 sm:gap-4 text-left">
          <FooterLogo
            candidates={uni2Candidates}
            alt="Pontificia Universidad Javeriana"
            imgClassName="h-[67px] sm:h-[80px] md:h-[94px] w-auto max-w-[190px] sm:max-w-[290px] md:max-w-[380px] object-contain shrink-0"
          />
          <div className="flex flex-col">
            <p className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: '#e5e7eb' }}>
              {WebpageContent.footer_uni2_title || "Laboratorio de Economía de la Educación"}
            </p>
            <a
              href={`mailto:${WebpageContent.footer_uni2_email || "lee@javeriana.edu.co"}`}
              className="text-gray-400 hover:text-white text-[11px] sm:text-xs transition-colors"
              style={{ color: '#9ca3af' }}
            >
              {WebpageContent.footer_uni2_email || "lee@javeriana.edu.co"}
            </a>
          </div>
        </div>

      </div>

      <p className="text-gray-500 text-[11px] sm:text-xs text-center pt-4" style={{ color: '#6b7280' }}>
        © {currentYear} {WebpageContent.footer_copyright}
      </p>
    </footer>
  );
};

export default Footer;