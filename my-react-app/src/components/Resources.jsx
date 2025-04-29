import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Description.css';

const Resources = () => (
    <div className="main-content-area">
        <div className="description-container my-8">
            <h1 className="description-title">Resources</h1>
            <div className="description-content">
            <p>Below are some resources to learn more about the data and technologies used in this application:</p>
            <ul className="list-disc list-inside my-4">
                <li><a href="https://d3js.org/" className="text-blue-600 hover:underline">D3.js Documentation</a> - Learn about the library used for our interactive visualizations.</li>
                <li><a href="https://react.dev/" className="text-blue-600 hover:underline">React Documentation</a> - Explore the framework powering our user interface.</li>
                <li><a href="https://tailwindcss.com/" className="text-blue-600 hover:underline">Tailwind CSS</a> - Understand the styling framework used for responsive design.</li>
                <li><a href="https://www.dane.gov.co/" className="text-blue-600 hover:underline">DANE Colombia</a> - Access official Colombian data sources for educational metrics.</li>
            </ul>
            <p>For additional information or to contribute to this project, please contact the development team.</p>
            </div>
            <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">Back to Home</Link>
        </div>        
    </div>
);

export default Resources;