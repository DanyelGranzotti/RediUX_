import React, { useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    if (inputValue && Array.isArray(options)) {
      const filtered = options.filter(
        (option) =>
          !selectedTags.includes(option) &&
          option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [inputValue, options, selectedTags]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleTagClick = useCallback(
    (tag) => {
      onTagAdd(tag);
      setInputValue("");
      setShowOptions(false);
    },
    [onTagAdd]
  );

  const handleClearInput = useCallback(() => {
    setInputValue("");
    setShowOptions(false);
  }, []);

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
      {inputValue && (
        <button
          type="button"
          onClick={handleClearInput}
          className="absolute right-0 top-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      )}
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:text-blue-500"
              onClick={() => handleTagClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {showOptions && filteredOptions.length === 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 p-2 text-gray-500">
          Nenhuma Tag cadastrada.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 m-2">
        {Array.isArray(selectedTags) &&
          selectedTags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-200 text-gray-dark hover:font-normal text-sm px-2 py-1 rounded-full cursor-pointer font-light"
              onClick={() => onTagRemove(tag)}
            >
              {tag.label}
              <button
                type="button"
                className="ml-1 text-gray-500  focus:outline-none hover:font-semibold"
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
