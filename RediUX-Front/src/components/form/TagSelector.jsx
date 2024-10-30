import React, { useState } from "react";

const TagSelector = ({
  label,
  options,
  selectedTags = [],
  onTagAdd,
  onTagRemove,
  defaultOption = "Digite para buscar...",
  width = "w-full",
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value && Array.isArray(options)) {
      const filtered = options.filter(
        (option) =>
          !selectedTags.includes(option) &&
          option.label.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleTagClick = (tag) => {
    onTagAdd(tag);
    setInputValue("");
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
        value={inputValue}
        onChange={handleInputChange}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
        placeholder={defaultOption}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleTagClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {Array.isArray(selectedTags) &&
          selectedTags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-full cursor-pointer"
              onClick={() => onTagRemove(tag)}
            >
              {tag.label}
              <button
                type="button"
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
      </div>
    </div>
  );
};

export default TagSelector;
