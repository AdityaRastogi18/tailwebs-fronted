import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Api from "../services/Api";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/authContext";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const updateFormData = (e, field) => {
    setErrors({ ...errors, [field]: "" });
    setFormData({ ...formData, [field]: e.target.value });
  };

  const { login } = useAuth();

  const navigate = useHistory();

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    } else if (formData.firstName.length < 3) {
      newErrors.password = "First Name must be at least 3 characters long";
    }
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
      const response = await Api.signup(urlEncodedData);
      return response;
    },
    {
      onSuccess: (data) => {
        login(data.token, data);
        navigate.push("/home");
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = handleValidation();
    if (Object.keys(newErrors).length === 0) {
      mutation.mutate();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm lg:max-w-md ">
      <img
        src="/images/tailwebsLogo.png"
        alt="tailwebsLogo"
        className="h-8 w-2/4 mb-6"
      />
      <form>
        <div className="mb-4">
          <label className="block label">
            Enter your first name <span className="text-red-500">*</span>
          </label>
          <input
            type="firstName"
            placeholder="Aditya"
            className="form-input"
            value={formData.firstName}
            onChange={(e) => updateFormData(e, "firstName")}
          />
          {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
        </div>
        <div className="mb-4">
          <label className="block label">Enter your last name</label>
          <input
            type="lastName"
            placeholder="Rastogi"
            className="form-input"
            value={formData.lastName}
            onChange={(e) => updateFormData(e, "lastName")}
          />
        </div>
        <div className="mb-4">
          <label className="block label">
            Enter your email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="form-input"
            value={formData.email}
            onChange={(e) => updateFormData(e, "email")}
          />
          {errors.email && <p className="error-msg">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <div className="relative">
            <label className="block label">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="form-input pr-10"
              value={formData.password}
              onChange={(e) => updateFormData(e, "password")}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute bottom-0 right-0 flex items-center pr-3  h-[42px]"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="btn bg-red-600 hover:bg-red-800 w-full"
            onClick={handleSignUp}
          >
            {mutation.isLoading ? <BtnLoader /> : "Sign Up"}
          </button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-5">
          Already have an account?
          <a href="/login" className="link">
            Login!
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
