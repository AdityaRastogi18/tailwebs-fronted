import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Api from "../services/Api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("form", formData);
    const result = await Api.login(formData);
    console.log(result);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md ">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
        Login
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter your email:
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="form-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="form-input pr-10"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
          <a href="#" className="link mt-2 text-end w-full">
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="btn w-full" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-5">
          Don't have an account?
          <a href="#" className="link">
            Sign Up!
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
