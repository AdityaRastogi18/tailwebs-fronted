import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // Optionally trigger search with empty query to clear results
  };

  return (
    <div className="flex items-center w-3/4 max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="flex-1 px-4 py-2 border-none focus:outline-none "
      />

      {query ? (
        <button
          onClick={handleClear}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : (
        <button className="p-2 text-blue-500 hover:text-blue-600 focus:outline-none">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
