import React from "react";

interface DropdownProps {
  options: { value: string }[];
  onChange: (value: any) => void;
  selectedValue: string;
}

const DropdownSearch: React.FC<DropdownProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="form-select text-[#679436] text-md bg-transparent"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-[#679436]"
        >
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default DropdownSearch;
