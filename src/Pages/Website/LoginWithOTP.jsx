import React, { useState, useRef } from "react";

const LoginWithOTP = ({ email }) => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value || "";
    setOTP(newOTP);
  
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, value) => {
    if (!value && index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      inputRefs[index - 1].current.focus();
    }else{
        const newOTP = [...otp];
        newOTP[index] = "";
        setOTP(newOTP);
        inputRefs[index].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      handleBackspace(index, otp[index]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with OTP:", otp);
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4 text-white text-center">
        <label htmlFor="otp" className="block text-lg font-bold mb-4">
          Enter OTP
        </label>
      </div>
      <div className="flex justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            id={`otp${index}`}
            name={`otp${index}`}
            className="w-16 h-12 text-2xl px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-center mx-2"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={inputRefs[index]}
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 mt-4"
      >
        Verify OTP
      </button>

      <p className="text-black5 mt-4 text-sm text-center">
        Didn't receive OTP?{" "}
        <button
          type="button"
          className="text-blue-500"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>
      </p>
    </form>
  );
};

export default LoginWithOTP;
