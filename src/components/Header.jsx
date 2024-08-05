import React from "react";
import { useAuth } from "../contexts/authContext"; // Adjust the import path as needed
import { useHistory } from "react-router-dom";

const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useHistory();

  const handleLogout = () => {
    logout();
    navigate.push("/login");
  };

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <img
          src="/images/tailwebsLogo.png"
          alt="tailwebsLogo"
          className="h-8 w-auto"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate.push("/settings")}
            className="text-white hover:text-gray-400"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
