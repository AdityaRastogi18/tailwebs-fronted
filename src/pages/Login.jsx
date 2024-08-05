import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Api from "../services/Api";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/authContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const navigate = useHistory();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const updateFormData = (e, field) => {
    setErrors({ ...errors, [field]: "" });
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const mutation = useMutation(
    async () => {
      const urlEncodedData = new URLSearchParams(formData).toString();
      const result = await Api.login(urlEncodedData);
      return result;
    },
    {
      onSuccess: (data) => {
        console.log("data", data);
        login(data.token, data);
        navigate.push("/");
      },
      onError: (error) => {
        console.error("Login error:", error);
        // Handle errors, e.g., show an error message
      },
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = handleValidation();
    if (Object.keys(newErrors).length === 0) {
      mutation.mutate();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md">
      <img
        src="/images/tailwebsLogo.png"
        alt="tailwebsLogo"
        className="h-8 w-2/4 mb-6"
      />
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="label">
            Enter your email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className={`form-input w-full px-3 py-2 border rounded-lg ${
              errors.email ? "border-red-500" : ""
            }`}
            value={formData.email}
            onChange={(e) => updateFormData(e, "email")}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>
        <div className="mb-6 ">
          <div className="relative">
            <label className="label">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`form-input w-full px-3 py-2 border rounded-lg pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              value={formData.password}
              onChange={(e) => updateFormData(e, "password")}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute bottom-0 right-0 flex items-center pr-3 h-[44px]"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="btn w-full text-center">
            {mutation.isLoading ? "Loging In..." : "Login"}
          </button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-5">
          Don't have an account?
          <a href="/signup" className="link">
            Sign Up!
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
