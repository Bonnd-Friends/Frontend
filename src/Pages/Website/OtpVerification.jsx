import React, { useState } from "react";
import LoginWithOTP from "./LoginWithOTP";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);

  const handleGetOtp = async (e) => {
    e.preventDefault();
    console.log("Getting OTP for email:", email);
    setShowLoginWithOtp(true);
  };

  return (
    <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md min-h-0 h-auto">
    
      {showLoginWithOtp ? (
        <LoginWithOTP/>
      ) : (
        <>
        <h2 className="flex justify-center text-2xl font-semibold text-white mb-6">
            OTP Login
        </h2>
        <form onSubmit={handleGetOtp}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black6 text-sm font-bold mb-2"
            >
              Enter Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
          >
            Get OTP
          </button>
        </form>
        </>
      )}
    </div>
  );
};

export default OtpVerification;
