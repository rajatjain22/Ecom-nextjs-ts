import { useState, ChangeEvent } from "react";
import { CloseEyeIcon, DeleteIcon, OpenEyeIcon } from "@/components/Icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  error?: string;
  prefix?: any;
  deleteOptionHandle?: () => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  prefix,
  inputSize = "",
  type = "text",
  name = "",
  className = "",
  placeholder = "",
  error = "",
  value = "",
  onChange,
  deleteOptionHandle,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const errorClass = error ? "border border-red-600" : "";
  const classes = `${errorClass} block w-full rounded-lg border border-gray-300 py-2 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ${inputSize} ${className}`;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <input
          type={showPassword ? "text" : type}
          id={id}
          name={name}
          autoComplete="off"
          className={`${classes} ${
            deleteOptionHandle || type === "password" ? "!pr-9" : ""
          } ${prefix ? "!pl-7" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-invalid={!!error}
          {...rest}
        />
        {prefix && (
          <span className="absolute top-3 left-2 cursor-pointer">{prefix}</span>
        )}
        {type === "password" && (
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <CloseEyeIcon width={25} height={25} />
            ) : (
              <OpenEyeIcon width={25} height={25} /> 
            )}
          </div>
        )}
        {deleteOptionHandle && (
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={deleteOptionHandle}
          >
            <DeleteIcon width={20} height={20} />
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-600 mt-1 inline-block text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
