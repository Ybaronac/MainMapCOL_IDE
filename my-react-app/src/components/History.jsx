import React from 'react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import Timeline from './Timeline';

const History = () => (
  <div className="flex flex-col">
    <div className="pt-16 mb-32">
      <TitleHeader />
      <TextSection
        content={[
          { type: 'title', text: WebpageContent.history_title1 },
          { type: 'paragraph', text: WebpageContent.history_paragraph1 },
          { type: 'paragraph', text: WebpageContent.history_paragraph1_2 }
        ]}
      />
    </div>

    <div style={{ paddingTop: '2.5rem' }}>
      <Timeline />
    </div>

    <div style={{ paddingTop: '2.5rem' }}>
      <TextSection
        content={[
          { type: 'paragraph', text: WebpageContent.history_paragraph8 }
        ]}
      />
    </div>

  </div>
);

export default History;


