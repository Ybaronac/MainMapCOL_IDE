import React from 'react';

const TextSection = ({ content = [] }) => (
  <div className="description-container">
    <div className="description-content">
      {content.map((item, idx) => {
        const prev = content[idx - 1];
        if (item.type === 'title') {
          return (
            <h4 key={idx} className="description-title">
              {item.text}
            </h4>
          );
        }
        if (item.type === 'subtitle') {
          return (
            <h3 key={idx} className="description-subtitle">
              {item.text}
            </h3>
          );
        }
        if (item.type === 'paragraph') {
          const paragraphClass = prev && prev.type === 'title' ? 'mt-0' : '';
          return (
            <p key={idx} className={paragraphClass}>
              {item.text}
            </p>
          );
        }
        return null;
      })}
    </div>
  </div>
);

export default TextSection;