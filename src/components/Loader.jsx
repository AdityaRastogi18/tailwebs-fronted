import React from "react";

const Loader = () => {
  return (
    <div
      data-testid="loader"
      className="flex items-center justify-center min-h-screen"
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
