import React from 'react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import Timeline from './Timeline';

const History = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <TitleHeader />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.history_title1 },
        { type: 'paragraph', text: WebpageContent.history_paragraph1 },
        { type: 'paragraph', text: WebpageContent.history_paragraph1_2 }
      ]}
    />

    <Timeline />

    <TextSection
      content={[
        { type: 'paragraph', text: WebpageContent.history_paragraph8 }
      ]}
    />
  </div>
);

export default History;


