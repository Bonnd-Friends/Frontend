import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black1 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">App</div>
        {/* Add your navigation links here */}
        <div className="space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
          <a href="#" className="text-white hover:text-gray-300">Login</a>
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
  return (
    <div className="bg-black2 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1 p-8">
        <h1 className="text-3xl font-semibold text-white mb-4">Welcome to </h1>
        <p className="text-white">
          HOMEPAGE
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
