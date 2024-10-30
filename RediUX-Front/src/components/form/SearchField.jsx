import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  onSearch,
  width = "w-full",
}) => {
  return (
    <div className={`${width}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`border rounded-l w-full py-2 px-3 text-gray-700 h-10 border-r-0
            ${error ? "border-red-500" : ""}`}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button
          onClick={onSearch}
          className={`hover:bg-blue-700 py-2 px-3 rounded-r border h-10 border-l-0  ${
            error ? "border-red-500 " : ""
          }`}
        >
          <BsSearch className="hover:opacity-40" />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default SearchField;
