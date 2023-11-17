import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("login-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful!");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const redirectToRegister = () => {
    navigateTo("/register");
  };

  return (
    <div className="max-w-md w-full p-6 bg-black2 rounded-md shadow-md min-h-0 h-auto">
      <h2 className="flex justify-center text-2xl font-semibold text-white mb-6">
        {isLoginMode ? "Login" : "Sign Up"}
      </h2>

      {isLoginMode ? (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black6 text-sm font-bold mb-2"
            >
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
        <RegisterPage switchToLogin={switchMode} />
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
  );
};

export default LoginPage;
