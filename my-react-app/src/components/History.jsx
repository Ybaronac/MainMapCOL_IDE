import React from 'react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';

const History = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <TextSection
      content={[
        { type: 'title', text: WebpageContent.history_title1 },
        { type: 'paragraph', text: WebpageContent.history_paragraph1 },
        { type: 'paragraph', text: WebpageContent.history_paragraph1_2 }
      ]}
    />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.history_title2 },
        { type: 'title', text: WebpageContent.history_title3 },
        { type: 'paragraph', text: WebpageContent.history_paragraph3 },
        { type: 'title', text: WebpageContent.history_title4 },
        { type: 'paragraph', text: WebpageContent.history_paragraph4 },
        { type: 'title', text: WebpageContent.history_title5 },
        { type: 'paragraph', text: WebpageContent.history_paragraph5 },
        { type: 'title', text: WebpageContent.history_title6 },
        { type: 'paragraph', text: WebpageContent.history_paragraph6 },
        { type: 'title', text: WebpageContent.history_title7 },
        { type: 'paragraph', text: WebpageContent.history_paragraph7 },
        { type: 'paragraph', text: WebpageContent.history_paragraph8 }
      ]}
    />
  </div>
);

export default History;