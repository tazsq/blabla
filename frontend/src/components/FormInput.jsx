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
}) {
  return (
    <div className="find-a-ride-input">
      <div className="find-a-ride-input-icon">
        {icon ? <img src={icon} alt="" height={25} width={25} /> : null}
        {/* <img src={icon} alt="" height={25} width={25} /> */}
      </div>

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
