import React from "react";
import logo from "../../assets/bonnd_logo.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black1">
      <img
        src={logo}
        alt="Logo"
        className="h-[45px] w-[45px] animate-bounce"
      />
    </div>
  );
};

export default Loader;
