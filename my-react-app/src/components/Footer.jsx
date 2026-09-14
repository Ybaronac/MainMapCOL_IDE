import React, { useState } from 'react';
import { Mail } from 'lucide-react';
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
      className={imgClassName || "h-12 md:h-14 w-auto max-w-[220px] md:max-w-[260px] object-contain mb-3"}
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
      className="footer bg-black text-gray-300 w-full py-10 px-6"
      style={{ backgroundColor: '#000000', color: '#d1d5db', border: 'none', outline: 'none' }}
    >
      <div className="footer-grid">
        
        {/* Universidad 1 */}
        <div className="flex flex-col items-center text-center max-w-sm w-full">
          <FooterLogo
            candidates={uni1Candidates}
            alt="Universidad Nacional de Colombia"
            imgClassName="h-12 md:h-14 w-auto max-w-[200px] md:max-w-[240px] object-contain mb-3"
          />
          <p className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wide mt-1 mb-1" style={{ color: '#9ca3af' }}>
            {WebpageContent.footer_uni1_title || "Facultad de Ciencias Económicas"}
          </p>
          <a
            href={`mailto:${WebpageContent.footer_uni1_email || "viceinvfce_bog@unal.edu.co"}`}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-[11px] sm:text-xs transition-colors"
            style={{ color: '#6b7280' }}
          >
            <Mail className="w-3 h-3 text-gray-500 shrink-0" style={{ color: '#6b7280' }} />
            <span>{WebpageContent.footer_uni1_email || "viceinvfce_bog@unal.edu.co"}</span>
          </a>
        </div>

        {/* Universidad 2 */}
        <div className="flex flex-col items-center text-center max-w-sm w-full">
          <FooterLogo
            candidates={uni2Candidates}
            alt="Pontificia Universidad Javeriana"
            imgClassName="h-[67px] md:h-[84px] w-auto max-w-[280px] md:max-w-[340px] object-contain mb-3"
          />
          <p className="text-gray-400 text-xs sm:text-sm font-semibold tracking-wide mt-1 mb-1" style={{ color: '#9ca3af' }}>
            {WebpageContent.footer_uni2_title || "Laboratorio de Economía de la Educación"}
          </p>
          <a
            href={`mailto:${WebpageContent.footer_uni2_email || "lee@javeriana.edu.co"}`}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-[11px] sm:text-xs transition-colors"
            style={{ color: '#6b7280' }}
          >
            <Mail className="w-3 h-3 text-gray-500 shrink-0" style={{ color: '#6b7280' }} />
            <span>{WebpageContent.footer_uni2_email || "lee@javeriana.edu.co"}</span>
          </a>
        </div>

      </div>

      <p className="text-gray-500 text-[11px] sm:text-xs text-center pt-4" style={{ color: '#6b7280' }}>
        © {currentYear} {WebpageContent.footer_copyright}
      </p>
    </footer>
  );
};

export default Footer;