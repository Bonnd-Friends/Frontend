import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black1">
      <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md text-white text-center h-[33%]">
        <h2 className="text-9xl bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          404
        </h2>
        <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Not Found</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
