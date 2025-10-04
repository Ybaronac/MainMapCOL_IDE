import React from 'react';
import '../styles/Description.css';

const TextSection = ({ content = [] }) => (
  <div className="description-container">
    <div className="description-content">
      {content.map((item, idx) => {
        if (item.type === 'title') {
          return <h4 key={idx} className="description-title">{item.text}</h4>;
        }
        if (item.type === 'subtitle') {
          return <h3 key={idx} className="description-subtitle">{item.text}</h3>;
        }
        if (item.type === 'paragraph') {
          return <p key={idx}>{item.text}</p>;
        }
        return null;
      })}
    </div>
  </div>
);

export default TextSection;