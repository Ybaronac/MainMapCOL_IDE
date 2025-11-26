import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import InfoCards from './InfoCards';
import { Target, TrendingUp, Users, FileCheck, Lightbulb, MessageSquare, UserCheck } from 'lucide-react';

const About = () => (
  <div className="flex flex-col">
    <div className="pt-16 mb-20">
      <TitleHeader />
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.purpose_title1 },
          { type: 'paragraph', text: WebpageContent.purpose_paragraph1 }
        ]}
      />
    </div>

    {/* Primera sección de InfoCards */}
    <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
      <div className="w-[85%] max-w-none mx-auto">
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
          style={{ gap: '1rem', padding: '1rem 0' }}
        >
          <InfoCards
            title={WebpageContent.purpose_title2}
            text={WebpageContent.purpose_paragraph2}
            icon={<Target className="w-20 h-20" />}
          />
          <InfoCards
            title={WebpageContent.purpose_title3}
            text={WebpageContent.purpose_paragraph3}
            icon={<TrendingUp className="w-20 h-20" />}
          />
          <InfoCards
            title={WebpageContent.purpose_title4}
            text={WebpageContent.purpose_paragraph4}
            icon={<Users className="w-20 h-20" />}
          />
          <InfoCards
            title={WebpageContent.purpose_title5}
            text={WebpageContent.purpose_paragraph5}
            icon={<FileCheck className="w-20 h-20" />}
          />
        </div>
      </div>
    </div>

    {/* Párrafo de contexto */}
    <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
      <TextSection
        content={[
          { type: 'paragraph', text: WebpageContent.purpose_paragraph6 }
        ]}
      />
    </div>

    {/* Segunda sección de InfoCards */}
    <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
      <div className="w-[85%] max-w-none mx-auto">
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
          style={{ gap: '1rem', padding: '1rem 0' }}
        >
          <InfoCards
            title={WebpageContent.purpose_title7}
            text={WebpageContent.purpose_paragraph7}
            icon={<Lightbulb className="w-20 h-20" />}
          />
          <InfoCards
            title={WebpageContent.purpose_title8}
            text={WebpageContent.purpose_paragraph8}
            icon={<MessageSquare className="w-20 h-20" />}
          />
          <InfoCards
            title={WebpageContent.purpose_title9}
            text={WebpageContent.purpose_paragraph9}
            icon={<UserCheck className="w-20 h-20" />}
          />
        </div>
      </div>
    </div>

    {/* Párrafo final */}
    <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
      <TextSection
        content={[
          { type: 'paragraph', text: WebpageContent.purpose_paragraph10 }
        ]}
      />
    </div>

  </div>
);

export default About;