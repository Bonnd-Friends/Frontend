import React, { useState } from "react";
import LoginWithOTP from "./LoginWithOTP";
import {Link} from 'react-router-dom'
import AlertBox from "./AlertBox";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({})

  const handleGetOtp = async (e) => {
    e.preventDefault();
    console.log("Getting OTP for email:", email);
    try {
      const response = await fetch(`${import.meta.env.VITE_ENVIRONMENT=="PRODUCTION"?'/api':import.meta.env.VITE_BACKEND_URL}/auth/generate-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email }),
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
    setShowLoginWithOtp(true);
  };

  return (
    <>
    <AlertBox open={modal} setOpen={setModal} data={modalData}/>
    <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md min-h-0 h-auto">
    <button
      className="bg-black3 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
    >
      <Link to="/" className="text-white hover:text-gray-300">
        Back
      </Link>
    </button>
      {showLoginWithOtp ? (
        <LoginWithOTP email={email}/>
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
    </>
  );
};

export default OtpVerification;
