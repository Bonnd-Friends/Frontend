import React from "react";
import logo from "../../assets/bonnd.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black1">
      <img
        src={logo}
        alt="Logo"
        className="h-[30px] w-[100px] animate-bounce"
      />
    </div>
  );
};

export default Loader;
