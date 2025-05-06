import React from 'react';
import '../styles/TransparentWindow.css';

const TransparentWindow = ({
  top = 20,
  left = 20,
  width = 200,
  height = 150,
  isInteractive = false,
  text = '',
  children
}) => {
  return (
    <div
      className={`transparent-window ${isInteractive ? 'interactive' : ''}`}
      style={{
        '--top': `${top}px`,
        '--left': `${left}px`,
        '--width': `${width}px`,
        '--height': `${height}px`
      }}
    >
      {text ? <p>{text}</p> : children}
    </div>
  );
};

export default TransparentWindow;