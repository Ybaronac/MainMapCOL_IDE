import React from 'react';
import WebpageContent from '../config/WebpageContent';
import '../styles/Description.css';
import TextSection from './TextSection';

const VisualizationTool = () => (
  <div className="main-content-area">
    <TextSection
      content={[
        { type: 'title', text: WebpageContent.VTool_title },
        { type: 'paragraph', text: WebpageContent.VTool_paragraph },
      ]}
    />

    <TextSection
      content={[
        { type: 'title', text: WebpageContent.VTool_title1 },
        { type: 'paragraph', text: WebpageContent.VTool_paragraph1 },
        { type: 'title', text: WebpageContent.VTool_title2 },
        { type: 'paragraph', text: WebpageContent.VTool_paragraph2 },   
      ]}
    />
    

  </div>
);

export default VisualizationTool;