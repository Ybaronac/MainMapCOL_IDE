import React from 'react';

const Layout = ({ children }) => (
<div className="min-h-screen bg-gray-100 flex justify-center">
    <div className="w-full max-w-4xl mx-4 my-8 p-6 bg-white shadow-lg rounded-lg">
    {children}
    <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">Back to Home</a>
    </div>
</div>
);

export default Layout;