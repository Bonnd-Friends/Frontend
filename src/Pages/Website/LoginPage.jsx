// LoginPage.js
import React, { useState } from "react";
import LoginWithEmail from "./LoginWithEmail";
import LoginWithOTP from "./LoginWithOtp";

const LoginPage = () => {
  const [selectedLoginMethod, setSelectedLoginMethod] = useState(null);

  const handleLoginMethodChange = (method) => {
    setSelectedLoginMethod(method);
  };

  const handleEmailLogin = async (email, password) => {
    console.log("Logging in with email/password:", email, password);
  };

  const handleOTPLogin = async (otp) => {
    // Implement your login with OTP logic here
    console.log("Logging in with OTP:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black1">
      <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md">
  
        {selectedLoginMethod === "email" ? (
          <LoginWithEmail onEmailLogin={handleEmailLogin} />
        ) : selectedLoginMethod === "otp" ? (
          <LoginWithOTP onOTPLogin={handleOTPLogin} />
        ) : null}
  
        {/* Provide buttons to switch between login methods */}
        <div className={`flex flex-col items-center mt-4 ${selectedLoginMethod ? 'hidden' : ''}`}>
          <button
            className={`${
              selectedLoginMethod === "email" ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg" : "bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg"
            } w-80 py-2 rounded-md mb-4`}
            onClick={() => handleLoginMethodChange("email")}
          >
            Login with Email/Password
          </button>
          <button
            className={`${
              selectedLoginMethod === "otp" ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg" : "bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg"
            } w-80 py-2 rounded-md`}
            onClick={() => handleLoginMethodChange("otp")}
          >
            Login with OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
