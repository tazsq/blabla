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
    <div
      className={`
        flex w-full items-center gap-2
        rounded-2xl p-2
        transition-colors
        hover:bg-gray-100
        m-0.5
        
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <div className="flex items-center justify-center opacity-70">
          <img src={icon} alt="" className="h-5 w-5" />
        </div>
      )}

      {/* Label (optional, mostly for accessibility) */}
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        min={type === "number" ? 0 : undefined}
        max={type === "number" ? 8 : undefined}
        className="
          w-full bg-transparent
          px-2 py-2
          outline-none
          placeholder:text-gray-400
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}
export default FormInput;
