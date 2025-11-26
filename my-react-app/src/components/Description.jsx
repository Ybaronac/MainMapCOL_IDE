import React from 'react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import InfoCards from './InfoCards';
import { Circle } from 'lucide-react';

const Description = () => (
  <div>
    <TitleHeader />
    <div className="pb-2" style={{ paddingTop: '0.5rem' }}>'
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.description_title1 },
          { type: 'paragraph', text: WebpageContent.description_paragraph1 }
        ]}
      />
    </div>

    <div className="pb-2" style={{ paddingTop: '2rem' }}>
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.description_title2 },
          { type: 'paragraph', text: WebpageContent.description_paragraph2 }
        ]}
      />
    </div>

    <div className="pb-2" style={{ paddingTop: '1rem' }}>
      <div className="w-[85%] max-w-none mx-auto">
        <div
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
          style={{ gap: '1rem', padding: '1rem 0' }}
        >
          <InfoCards
            title={WebpageContent.description_title3}
            text={WebpageContent.description_paragraph3}
            icon={<Circle className="w-20 h-20" style={{ color: 'var(--chart-bar-1)' }} />}
          />
          <InfoCards
            title={WebpageContent.description_title4}
            text={WebpageContent.description_paragraph4}
            icon={<Circle className="w-20 h-20" style={{ color: 'var(--chart-bar-2)' }} />}
          />
          <InfoCards
            title={WebpageContent.description_title5}
            text={WebpageContent.description_paragraph5}
            icon={<Circle className="w-20 h-20" style={{ color: 'var(--chart-bar-3)' }} />}
          />
          <InfoCards
            title={WebpageContent.description_title6}
            text={WebpageContent.description_paragraph6}
            icon={<Circle className="w-20 h-20" style={{ color: 'var(--chart-bar-4)' }} />}
          />
        </div>
      </div>
    </div>

    <div className="pb-2" style={{ paddingTop: '1rem' }}>
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.description_title7 },
          { type: 'paragraph', text: WebpageContent.description_paragraph7 }
        ]}
      />
    </div>

  </div>
);

export default Description;