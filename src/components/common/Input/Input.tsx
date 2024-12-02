import React, {
  ChangeEvent,
  KeyboardEvent,
  useState,
  ForwardedRef,
} from "react";
import {
  CloseEyeIcon,
  CrossIcon,
  DeleteIcon,
  OpenEyeIcon,
} from "@/components/Icons";
import Badge from "../Badge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  error?: string;
  prefix?: React.ReactNode; // Corrected type here
  value: string | number;
  tags?: string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onTagChange?: (updatedTags: string[]) => void;
  removeTag?: (index: number) => void;
  deleteOptionHandle?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      tags = [],
      onTagChange,
      removeTag,
      onChange,
      deleteOptionHandle,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const errorClass = error ? "border-red-600" : "border-gray-300";
    const classes = [
      "border block w-full rounded-lg py-2 px-4 text-sm outline-none transition duration-200",
      "focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500",
      errorClass,
      inputSize,
      className,
      deleteOptionHandle || type === "password" ? "!pr-9" : "",
      prefix ? "!pl-7" : "",
    ].join(" ");

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    const addTag = (event: KeyboardEvent<HTMLInputElement>) => {
      if ((event.key === "Enter" || event.key === "Tab") && name === "tags") {
        event.preventDefault();
        const trimmedInput = value?.trim();
        if (trimmedInput) {
          const newTags = trimmedInput
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag && !tags.includes(tag));

          if (onTagChange) {
            onTagChange([...tags, ...newTags]);
          }
        }
      }
    };

    const handleRemoveTag = (index: number) => {
      if (removeTag) {
        removeTag(index);
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
            ref={ref}
            type={showPassword ? "text" : type}
            id={id}
            name={name}
            autoComplete="off"
            className={classes}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => (name === "tags" ? addTag(e) : undefined)}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...rest}
          />
          {prefix && <span className="absolute top-3 left-2">{prefix}</span>}
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

        {name === "tags" && Array.isArray(tags) && (
          <div className="inline-flex gap-2 mt-2 text-wrap flex-wrap">
            {tags.map((tag, index) => (
              <Badge key={index}>
                <span>{tag}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleRemoveTag(index)}
                >
                  <CrossIcon width={8} height={8} />
                </span>
              </Badge>
            ))}
          </div>
        )}

        {error && (
          <div
            id={`${id}-error`}
            className="text-red-600 mt-1 inline-block text-xs font-medium"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
