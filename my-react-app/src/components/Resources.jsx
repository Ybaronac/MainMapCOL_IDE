import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Description.css';
import WebpageContent from '../config/WebpageContent';

const Resources = () => (
    <div className="main-content-area">
        <div className="description-container my-8">
            <h1 className="description-title">{WebpageContent.resources_title}</h1>
            <div className="description-content">
            <p>{WebpageContent.resources_paragraph1}</p>
            <ul className="list-disc list-inside my-4">
                {WebpageContent.resources_list.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.url} className="text-blue-600 hover:underline">{item.text}</a> - {item.description}
                  </li>
                ))}
            </ul>
            <p>{WebpageContent.resources_paragraph2}</p>
            </div>
            <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">{WebpageContent.resources_backToHome}</Link>
        </div>        
    </div>
);

export default Resources;