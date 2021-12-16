import "./inputfield.css";

const InputField = ({
  type,
  placeholderText,
  value = "",
  onChange,
  onBlur,
  editable = false,
}) => (
  <input
    className="inputContainer"
    type={type}
    placeholder={placeholderText}
    value={value}
    disabled={editable}
    onBlur={onBlur}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default InputField;
