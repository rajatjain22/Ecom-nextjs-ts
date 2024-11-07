import { ChangeEvent } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  name = "",
  className = "",
  placeholder = "",
  error = "",
  value = "",
  onChange,
  ...rest
}) => {
  const errorClass = error ? "border border-red-600" : "";
  const classes = `${errorClass} block w-full rounded-lg border border-gray-300 py-2 px-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition duration-200 ${className}`;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="mt-2">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 inline-block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        className={classes}
        placeholder={placeholder}
        value={value}
        rows={5}
        onChange={handleChange}
        aria-invalid={!!error}
        {...rest}
      />
      {error && (
        <div className="text-red-600 mt-1 inline-block text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default Textarea;
