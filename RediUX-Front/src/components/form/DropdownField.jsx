import React from "react";

const DropdownField = ({
  label,
  options,
  value,
  onChange,
  error,
  defaultOption = "Selecione uma opção",
  width = "w-full",
}) => {
  return (
    <div className={` ${width}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default DropdownField;
