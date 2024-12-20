import React, { useState, useEffect, memo } from "react";
import Select, { SingleValue, ActionMeta } from "react-select";

type Option = {
  value: string | number | null;
  label: string;
  isFixed?: boolean;
  isDisabled?: boolean;
};

interface ReactSelectProps {
  id?: string | number;
  label?: string;
  name?: string;
  options: Option[];
  placeholder?: string;
  isClearable?: boolean;
  onChange?: (
    selectedOption: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  onInputChange?: (inputValue: string) => void;
  className?: string;
  value?: string | number | null;
  error?: string;
  isLoading?: boolean;
  debounceDelay?: number;
}

const ReactSelect: React.FC<ReactSelectProps> = memo(({
  id,
  label,
  name,
  options,
  placeholder = "Search and select...",
  isClearable = true,
  onChange,
  onInputChange,
  className,
  value,
  error,
  isLoading = false,
  debounceDelay = 300,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleInputChange = (newInputValue: string) => {
    if (newInputValue) {
      setOpenModal(true);
      setInputValue(newInputValue);
    } else {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (onInputChange) {
        onInputChange(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay]);

  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (onChange) {
      onChange(newValue, actionMeta);
    }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      {label && (
        <label
          htmlFor={id?.toString()}
          className="mb-2 inline-block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Select
        name={name}
        value={value}
        onBlur={() => {
          setOpenModal(false);
        }}
        menuIsOpen={openModal}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        isClearable={isClearable}
        placeholder={placeholder}
        isLoading={isLoading}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: error ? "red" : base.borderColor,
            fontSize: "0.875rem",
            backgroundColor: "#ffffff",
            transition: "all 0.2s ease",
          }),
        }}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && (
        <div className="text-red-600 mt-1 inline-block text-xs font-medium">
          {error}
        </div>
      )}
    </div>
  );
});

export default ReactSelect;
