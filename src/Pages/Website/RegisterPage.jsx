import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import AlertBox from "./AlertBox";

const RegisterPage = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({})


  const handleRegister = async (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      try {
        const response = await fetch("https://amazing-nice-sunspot.glitch.me/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email:email, password:password, username:username, confirmPassword:confirmPassword }),
        });

        if (!response.ok) {
          setModalData({title:"Registered Successfully", description:`Welcome ${username} you are successfully registered`, button:'Login'})
          setModal(true)
          // Redirect to the login page after successful signup
          navigateTo("/login");
        } else {
          console.error("Signup failed");
          setModalData({title:"Signup failed", description:'Please Choose a different username for register', button:'Register'})
          setModal(true)
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setModalData({title:"Error during signup", description:'Please check the credentials properly and check your internet connection', button:'Okay'})
        setModal(true)
      }
    }
    else {
      setModalData({title:"Invalid Data", description:"Please keep both the passwords same", button:'Okay'})
      setModal(true)
    }
  };

  const switchToLogin = () => {
    navigateTo("/login");
  }

  return (
    <>
      <AlertBox open={modal} setOpen={setModal} data={modalData}/>
      <div className="min-h-screen flex items-center justify-center bg-black1">
        <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md">
          <h2 className="flex justify-center text-2xl font-semibold text-white mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-black6 text-sm font-bold mb-2">
                Email Address
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

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-black6 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-black6 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-black6 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>



            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
            >
              Sign Up
            </button>

            <p className="text-black5 mt-4 text-sm text-center">
              Already have an account?{" "}
              <button type="button" className="text-blue-500" onClick={switchToLogin}>
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;