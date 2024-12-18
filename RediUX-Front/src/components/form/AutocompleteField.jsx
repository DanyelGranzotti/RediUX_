import React, { useState } from "react";

const AutocompleteField = ({
  label,
  options,
  value,
  onChange,
  error,
  defaultOption = "Digite para buscar...",
  width = "w-full",
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue && Array.isArray(options)) {
      const filtered = options.filter((option) =>
        Object.values(option).some((value) =>
          String(value).toLowerCase().includes(inputValue.toLowerCase())
        )
      );

      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setShowOptions(false);
  };

  return (
    <div className={`relative ${width}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={defaultOption}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default AutocompleteField;
