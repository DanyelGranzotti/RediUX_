import React from "react";

const StringField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  width = "w-full",
  type = "text",
}) => {
  return (
    <div className={`${width}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10
            ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default StringField;
