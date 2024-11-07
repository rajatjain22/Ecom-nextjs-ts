import React from "react";

interface InputChecksProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  className?: string; // Optional for additional styling
  error?: string; // Optional for displaying error messages
}

const InputChecks: React.FC<InputChecksProps> = ({
  id,
  label,
  name,
  className = "",
  error,
  ...rest
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="flex label gap-3 justify-start cursor-pointer p-0 inputLabel"
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          className="checked:bg-primary checkbox-primary"
          {...rest}
        />
        <span className="label-text">{label}</span>
      </label>
      {error && (
        <div className="text-red-600 mt-1 inline-block text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputChecks;
