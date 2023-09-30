import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-heroBg">404 - Not Found</h1>
        <p className="text-lg mt-4 text-bG">
          Oops! The page you are looking for could not be found.
        </p>
        <p className="text-lg mt-2 text-bG">
          It seems like you've ventured into uncharted territory.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 py-2 px-4 bg-button text-white rounded hover:bg-button2 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
