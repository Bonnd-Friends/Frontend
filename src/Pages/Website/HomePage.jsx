import React, { useEffect, useState } from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../assets/bonnd.png";
import Loader from "./Loader";

const Navbar = () => {
  return (
    <nav className="bg-black1 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <img src={logo} className="h-[30px] w-[100px]" alt="Logo"></img>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
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
    <footer className="bg-black1 p-4 mt-8">
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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-black2 min-h-screen flex flex-col">
          <Navbar />
          <div className="container mx-auto flex-1 p-8">
            <h1 className="text-3xl font-semibold text-white mb-4">
              Welcome to{" "}
            </h1>
            <p className="text-white">HOMEPAGE CONTENT</p>

            <div className="mt-6">
              <Link to="/app" className="text-white hover:text-gray-300">
                <FaUser className="inline-block text-lg mr-1" />
                Profile
              </Link>
              <span className="text-white mx-2">|</span>
              <Link to="/login" className="text-white hover:text-gray-300">
                <FaSignOutAlt className="inline-block text-lg mr-1" />
                Logout
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Home;
