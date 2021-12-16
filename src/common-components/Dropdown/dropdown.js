import "./dropdown.css";

const Dropdown = ({ options, onchange, selectedValue }) => (
  <select
    onChange={onchange}
    className="dropdownContainer"
    defaultValue={selectedValue}
  >
    {options.map((option, index) => (
      <option key={option.value + index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Dropdown;
