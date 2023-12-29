import React, { useState, useRef } from "react";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router-dom";

const LoginWithOTP = ({ email }) => {
  const navigateTo = useNavigate();

  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({})

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

  const convertOtpToNumber = (otp) => {
    let multi = 1
    let new_otp = 0
    for(let i=otp.length-1;i>=0;i--){
      new_otp = new_otp+otp[i]*multi
      multi = multi*10

    }
    return new_otp
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const numberOtp = convertOtpToNumber(otp)
    console.log("OTP" + numberOtp)
    try {
      const response = await fetch(`${import.meta.env.VITE_ENVIRONMENT=="PRODUCTION"?'/api':import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, otp:numberOtp }),
        withCredentials: true, 
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Login successful!");
        setModalData({title:"Login Successfully", description:`Welcome ${email} you are successfully login`, button:'Okay'})
        setModal(true)
        navigateTo('/app')
      } else {
        // Handle login error
        console.error("Login failed");
        setModalData({title:"Login Failed", description:`Please check your credentials`, button:'Okay'})
        setModal(true)
        navigateTo('/login')
      }
    } catch (error) {
      console.error("Error during login:", error);
      setModalData({title:"Error during login", description:'Please check the credentials properly and check your internet connection', button:'Okay'})
      setModal(true)
      navigateTo('/login')
    }
  };

  const handleResendOtp = async (e) => {
    console.log("Resending OTP...");
    e.preventDefault();
    console.log("Getting OTP for email:", email);
    try {
      const response = await fetch(`${import.meta.env.VITE_ENVIRONMENT=="PRODUCTION"?'/api':import.meta.env.VITE_BACKEND_URL}/auth/generate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email }),
        withCredentials: true, 
        credentials: 'include'
      });

      if (response.ok) {
        console.log("OTP Sent successful!");
        setModalData({title:"OTP Sent Successfully", description:`OTP sent to ${email} Please check your email`, button:'Okay'})
        setModal(true)
      } else {
        // Handle login error
        console.error("OTP Sent failed");
        setModalData({title:"OTP Sent Failed", description:`Please check your credentials`, button:'Okay'})
        setModal(true)
      }
    } catch (error) {
      console.error("Error during sending OTP:", error);
      setModalData({title:"Error during sending OTP", description:'Please check the credentials properly and check your internet connection', button:'Okay'})
      setModal(true)
    }
  };

  return (
    <>
    <AlertBox open={modal} setOpen={setModal} data={modalData}/>
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
    </>
  );
};

export default LoginWithOTP;
