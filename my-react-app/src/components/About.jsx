import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Description.css';

const About = () => (
    <div className="main-content-area">
        <div className="description-container my-8">
            <h1 className="description-title">About This Application</h1>
            <div className="description-content">
            <p>This application provides an interactive visualization of educational metrics in Colombia. It features a choropleth map built with D3.js and React, allowing users to explore data across various categories such as General, Availability, Accessibility, Adaptability, and Acceptability. The app is designed to be responsive and user-friendly, with tools like tooltips, zoom functionality, and interactive controls.</p>
            <p>Our goal is to make educational data accessible and insightful for researchers, policymakers, and the general public. This project is developed with modern web technologies and a focus on data-driven decision-making.</p>
            </div>
            <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">Back to Home</Link>
        </div>
    </div>
);

export default About;