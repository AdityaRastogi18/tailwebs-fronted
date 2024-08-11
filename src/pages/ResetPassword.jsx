import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import Api from "../services/Api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import BtnLoader from "../components/BtnLoader";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useHistory();

  const authToken = token;

  const handleChange = (e) => {
    setNewPassword(e.target.value);
    if (error) {
      setError("");
    }
  };

  const validatePassword = () => {
    if (!newPassword) {
      return "Password is required";
    } else if (newPassword.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const mutation = useMutation(
    async () => {
      const response = await Api.updateUser(authToken, {
        password: newPassword,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        navigate.push("/login");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const validationError = validatePassword();
    if (!validationError) {
      mutation.mutate();
    } else {
      setError(validationError);
    }
  };

  return (
    <div className="mx-auto w-3/4 xl:max-w-md h-auto p-6 bg-white shadow-md rounded-md">
      <img
        src="/images/tailwebsLogo.png"
        alt="tailwebsLogo"
        className="h-8 w-2/4 mb-6"
      />
      <div className="relative w-full">
        <label className="label">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your new password"
          className={`form-input w-full px-3 py-2 border rounded-lg pr-10 ${
            error ? "border-red-500" : ""
          }`}
          value={newPassword}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute bottom-0 right-0 flex items-center pr-3 h-[44px]"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <div className="flex flex-col justify-center items-center gap-5 mt-5 w-full">
        <button
          onClick={handlePasswordChange}
          className={`btn bg-green-600 hover:bg-green-800 ${
            mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? <BtnLoader /> : "Update Password"}
        </button>
        <button
          onClick={() => navigate.goBack()}
          className={`font-bold text-gray-400 hover:text-gray-600 ${
            mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={mutation.isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
