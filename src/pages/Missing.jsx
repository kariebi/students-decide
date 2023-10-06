import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! It seems you've taken a wrong turn.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Don't worry; even the best get lost sometimes.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          Let's get you back on track. Click the link below to go home:
        </p>
        <Link
          to="/"
          className="text-primary hover:text-black transition duration-300 underline"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Missing;
