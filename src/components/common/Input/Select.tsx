import React from "react";
import "./input.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  className?: string;
  value?: string | number;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  name,
  className = "",
  error = "",
  value,
  onChange,
  ...rest
}) => {
  const errorClass = error ? "border border-red-600" : "";
  const classes = `block w-full rounded-lg border border-gray-300 py-2 px-4 text-sm outline-none focus:border-blue-500 bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ${errorClass} ${className}`;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 inline-block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          name={name}
          className={classes}
          onChange={handleChange}
          aria-invalid={!!error}
          value={value} // Controlled component using `value` only
          {...rest}
        >
          <option value="" disabled>
            {label || "Select"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-red-600 mt-1 inline-block text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
