import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useMutation } from "react-query";
import Api from "../services/Api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Settings = () => {
  const { user, token } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useHistory();

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
      const response = await Api.updateUser(token, { password: newPassword });
      return response.data;
    },
    {
      onSuccess: () => {
        setIsChangingPassword(false);
        setNewPassword("");
      },
      onError: (error) => {
        toast.error("Failed to update password: " + error.message);
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
      <div className="flex flex-col items-center">
        <div className="mb-4 border-[2px] border-gray-300 rounded-full">
          <FontAwesomeIcon
            icon={faUser}
            className="w-16 h-16 p-5 text-gray-400"
          />
        </div>
        <h2 className="text-4xl font-semibold mb-2">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-700 mb-4 text-lg">{user?.email}</p>
      </div>
      <div className="mt-6 w-full">
        {!isChangingPassword ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <button
              onClick={() => setIsChangingPassword(true)}
              className="btn bg-cyan-600 hover:bg-cyan-800"
            >
              Change Password
            </button>
            <button
              onClick={() => navigate.push("/home")}
              className="text-red-400  hover:text-red-500 font-bold"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
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
                {mutation.isLoading ? "Updating..." : "Update Password"}
              </button>
              <button
                onClick={() => setIsChangingPassword(false)}
                className={`font-bold text-gray-400 hover:text-gray-600 ${
                  mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={mutation.isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
