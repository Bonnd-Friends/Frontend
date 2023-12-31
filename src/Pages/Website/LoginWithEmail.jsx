import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import { Link } from "react-router-dom";

import AlertBox from "./AlertBox";

const LoginPage = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_ENVIRONMENT=="PRODUCTION"?'/api':import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, password:password }),
        withCredentials: true, 
        credentials: 'include',

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

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const redirectToRegister = () => {
    navigateTo("/register");
  };

  return (

    <div className="container">
      <button
      className="bg-black3 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
    >
      <Link to="/" className="text-white hover:text-gray-300">
        Back
      </Link>
    </button>

    <>
    <AlertBox open={modal} setOpen={setModal} data={modalData}/>

    <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md min-h-0 h-auto">
      <h2 className="flex justify-center text-2xl font-semibold text-white mb-6">
        {isLoginMode ? "Login" : "Sign Up"}
      </h2>

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-black6 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black6 text-sm font-bold mb-2"
            >
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
          >
            Login
          </button>
        </form>
      ) : (
        <RegisterPage />
      )}

      <p className="text-black5 mt-4 text-sm text-center">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="text-blue-500"
          onClick={isLoginMode ? redirectToRegister : switchMode}
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
    </>
    </div>

  );
};

export default LoginPage;