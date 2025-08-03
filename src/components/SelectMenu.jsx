import React, { useState } from 'react';

function SelectMenu({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div>
      {/* <label htmlFor="selectMenu">Choose an option:</label> */}
      <select id="selectMenu" value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectMenu;
