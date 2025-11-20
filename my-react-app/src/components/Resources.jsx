import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';

const Resources = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <TextSection
      content={[
        { type: 'title', text: WebpageContent.resources_title1 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph1 }
      ]}
    />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.resources_title2 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph2 },
        { type: 'subtitle', text: WebpageContent.resources_title3 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph3 },
        { type: 'subtitle', text: WebpageContent.resources_title4 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph4 },
        { type: 'subtitle', text: WebpageContent.resources_title5 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph5 },
        { type: 'subtitle', text: WebpageContent.resources_title6 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph6 },
        { type: 'subtitle', text: WebpageContent.resources_title7 },
        { type: 'paragraph', text: WebpageContent.resources_paragraph7 }
      ]}
    />
    

    <div className="max-w-4xl w-full mx-auto p-4">
      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
        {WebpageContent.resources_backToHome}
      </Link>
    </div>
  </div>
);

export default Resources;