import React from 'react';
import WebpageContent from '../config/WebpageContent';

const TitleHeader = () => (
  <>
      <div className="title-header-container flex items-center center-content">
        <div>
          <h1 className="title-header-title">{WebpageContent.header_title}</h1>
          {/* <p className="title-header-subtitle">{WebpageContent.header_subtitle}</p> */}
        </div>
      </div>
  </>
);

export default TitleHeader;