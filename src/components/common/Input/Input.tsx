import { useState, ChangeEvent } from "react";
import openEye from "@/assets/svg/openEye.svg";
import closeEye from "@/assets/svg/closeEye.svg";
import deleteIcon from "@/assets/svg/delete.svg"
import Image from "next/image";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number"; // Add other types as needed
  error?: string;
  deleteOptionHandle?: () => void; // Function for handling delete action
}

const Input: React.FC<InputProps> = ({
  id,
  label,
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
    setShowPassword(prev => !prev);
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
          className={classes}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-invalid={!!error}
          {...rest}
        />
        {type === "password" && (
          <Image
            priority
            src={showPassword ? closeEye : openEye}
            height={26}
            width={26}
            alt="Toggle Password Visibility"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
        {deleteOptionHandle && (
          <Image
            priority
            src={deleteIcon}
            height={26}
            width={26}
            alt="Delete Option"
            className="absolute top-1 right-2 cursor-pointer"
            onClick={deleteOptionHandle}
          />
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
