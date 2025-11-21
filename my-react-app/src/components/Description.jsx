import React from 'react';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';

const Description = () => (
  <div>
    <TitleHeader />
    <TextSection
      content={[
        { type: 'title', text: WebpageContent.description_title1 },
        { type: 'paragraph', text: WebpageContent.description_paragraph1 }
      ]}
    />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.description_title2 },
        { type: 'paragraph', text: WebpageContent.description_paragraph2 },
        { type: 'subtitle', text: WebpageContent.description_title3 },
        { type: 'paragraph', text: WebpageContent.description_paragraph3 },
        { type: 'subtitle', text: WebpageContent.description_title4 },
        { type: 'paragraph', text: WebpageContent.description_paragraph4 },
        { type: 'subtitle', text: WebpageContent.description_title5 },
        { type: 'paragraph', text: WebpageContent.description_paragraph5 },
        { type: 'subtitle', text: WebpageContent.description_title6 },
        { type: 'paragraph', text: WebpageContent.description_paragraph6 }
      ]}
    />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.description_title7 },
        { type: 'paragraph', text: WebpageContent.description_paragraph7 }
      ]}
    />
  </div>
);

export default Description;