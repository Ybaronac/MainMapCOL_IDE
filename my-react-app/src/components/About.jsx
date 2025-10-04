import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Description.css';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';

const About = () => (
  <div className="main-content-area">
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
    <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
      {WebpageContent.about_backToHome}
    </Link>
  </div>
);

export default About;