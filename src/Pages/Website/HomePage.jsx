import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/bonnd.png";
import Loader from "./Loader";
import bg_img from "../../assets/bg_img.png";

const Navbar = () => {
  return (
    <nav className="bg-black1 p-4 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <img src={logo} className="ml-2 h-[35px] w-[120px]" alt="Logo" />
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">
            <FaSignInAlt className="inline-block text-lg mr-1" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black1 p-4 relative z-20">
      <div className="container mx-auto text-center text-white">
        &copy; 2023 Your App. All rights reserved.
      </div>
    </footer>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeAsyncTask = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fakeAsyncTask();
  }, []);

  const handleInstallClick = async () => {
    console.log("App Installed")
  };

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
        <div className="flex-1 relative">
          <div
            className="min-h-screen absolute top-0 left-0 w-full h-full bg-center bg-cover filter blur-sm"
            style={{ backgroundImage: `url(${bg_img})` }}
          ></div>
          <Navbar />
          <div className="container h-screen flex items-center justify-center mx-auto flex-1 p-8 text-center relative z-10 flex-col">
            <h1 className="text-6xl font-semibold text-white mb-4">
              Welcome to Bonnd !!
            </h1>
            <button
              onClick={handleInstallClick}
              className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 rounded-full"
            >
              Install App
            </button>
          </div>
        </div>
      <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
