import React from "react";

function FormInput({
  icon,
  type,
  placeholder,
  value,
  name,
  handleChange,
  disabled,
  required,
  label,
  className,
}) {
  const id = placeholder?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className={`find-a-ride-input ${className}`}>
      <div className="find-a-ride-input-icon">
        {icon ? <img src={icon} alt="" height={25} width={25} /> : null}
        {/* <img src={icon} alt="" height={25} width={25} /> */}
      </div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {type === "number" ? (
        <input
          type={type}
          placeholder={placeholder}
          max="8"
          min="0"
          name={name}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          required={required}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          name={name}
          disabled={disabled}
          required={required}
        />
      )}
    </div>
  );
}
export default FormInput;
