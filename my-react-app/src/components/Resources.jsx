import React from 'react';
import WebpageContent from '../config/WebpageContent';
import RESOURCE_LINKS from '../config/resourceLinks';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import InfoCards from './InfoCards';
import { BookOpen, FileText, BarChart2, GraduationCap, TrendingUp, Globe } from 'lucide-react';

const Resources = () => (
  <div className="flex flex-col">
    <div className="pt-16 mb-20">
      <TitleHeader />
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.resources_title1 },
          { type: 'paragraph', text: WebpageContent.resources_paragraph1 }
        ]}
      />
    </div>

    {/* Primera sección de InfoCards - Recursos */}
    <div className="pb-4" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
      <div className="w-[85%] max-w-none mx-auto">
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
          style={{ gap: '2rem', padding: '1rem 0' }}
        >
          <InfoCards
            title={WebpageContent.resources_title2}
            text={WebpageContent.resources_paragraph2}
            icon={<BookOpen className="w-20 h-20" />}
            link={RESOURCE_LINKS.etcData}
          />
          <InfoCards
            title={WebpageContent.resources_title3}
            text={WebpageContent.resources_paragraph3}
            icon={<FileText className="w-20 h-20" />}
            link={RESOURCE_LINKS.etcJson}
          />
          <InfoCards
            title={WebpageContent.resources_title4}
            text={WebpageContent.resources_paragraph4}
            icon={<BarChart2 className="w-20 h-20" />}
            link={RESOURCE_LINKS.etcMap}
          />
        </div>
      </div>
    </div>

    {/* Título de Otros estudios relacionados */}
    <div className="pb-2" style={{ paddingTop: '2rem' }}>
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.resources_other_studies_title }
        ]}
        className="transparent-section"
      />
    </div>

    {/* Segunda sección de InfoCards - Otros estudios relacionados */}
    <div className="pb-16" style={{ marginTop: '0.5rem', paddingTop: '0.5rem' }}>
      <div className="w-[85%] max-w-none mx-auto">
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
          style={{ gap: '2rem', padding: '1rem 0' }}
        >
          <InfoCards
            title={WebpageContent.resources_other_study1_title}
            text={WebpageContent.resources_other_study1_text}
            icon={<GraduationCap className="w-20 h-20" />}
            link={RESOURCE_LINKS.study1}
          />
          <InfoCards
            title={WebpageContent.resources_other_study2_title}
            text={WebpageContent.resources_other_study2_text}
            icon={<TrendingUp className="w-20 h-20" />}
            link={RESOURCE_LINKS.study2}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Resources;
