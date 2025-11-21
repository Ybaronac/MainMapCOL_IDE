import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';

const About = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <TitleHeader />
    <TextSection
      content={[
        { type: 'title', text: WebpageContent.purpose_title2 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph2 },
        { type: 'title', text: WebpageContent.purpose_title3 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph3 },
        { type: 'title', text: WebpageContent.purpose_title4 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph4 },
        { type: 'title', text: WebpageContent.purpose_title5 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph5 },
      ]}
    />
    <TextSection
      content={[
        { type: 'paragraph', text: WebpageContent.purpose_paragraph6 },
        { type: 'title', text: WebpageContent.purpose_title7 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph7 },
        { type: 'title', text: WebpageContent.purpose_title8 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph8 },
        { type: 'title', text: WebpageContent.purpose_title9 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph9 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph10 },
        { type: 'paragraph', text: WebpageContent.purpose_paragraph11 }
      ]}
    />
    <div className="max-w-4xl w-full mx-auto p-4">
      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
        {WebpageContent.about_backToHome}
      </Link>
    </div>
  </div>
);

export default About;