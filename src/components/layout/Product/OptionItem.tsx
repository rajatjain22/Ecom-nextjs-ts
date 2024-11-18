import React, { memo } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import { OptionItemType } from "./types";

const OptionItem: React.FC<OptionItemType> = memo(({
  option,
  optionIndex,
  onNameChange,
  onValueChange,
  onRemoveValue,
  onRemoveOption,
  onDone,
  onEdit,
  errors
}) => {
  const optionNameError = errors?.name;
  const optionValuesError = errors?.values;

  return (
    <div className="border rounded-lg p-4 mb-4">
      {option.done || option?.id ? (
        <div className="cursor-pointer" onClick={() => onEdit(optionIndex)}>
          <h2 className="font-semibold">{option.name}</h2>
          <div className="flex gap-2">
            {option.values.map((val, index) => (
              <span key={index} className="bg-[#D4E5FF] text-xs mr-2 px-2.5 py-0.5 rounded">{val}</span>
            ))}
          </div>
        </div>
      ) : (
        <>
          <Input
            label="Option name"
            name="name"
            type="text"
            id={`optionName${optionIndex}`}
            value={option.name}
            onChange={(e) => onNameChange(optionIndex, e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Size"
            autoFocus
          />
          {optionNameError && (
            <div className="text-xs text-red-600 mt-1">{optionNameError}</div>
          )}
          <div className="mt-2">
            <label className="inline-block text-sm font-medium text-gray-700">Option values</label>
            <div className="space-y-2">
              {option.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center">
                  <Input
                    name="value"
                    type="text"
                    id={`optionValue${optionIndex}-${valueIndex}`}
                    value={value}
                    onChange={(e) => onValueChange(optionIndex, valueIndex, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="XL"
                    deleteOptionHandle={option.values.length > 1 ? () => onRemoveValue(optionIndex, valueIndex) : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          {optionValuesError && (
            <div className="text-xs text-red-600 mt-1">{optionValuesError}</div>
          )}
          <div className="flex justify-between mt-2">
            <Button
              type="button"
              className="p-2 rounded-lg bg-red-600 py-2 text-sm text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => onRemoveOption(optionIndex)}
              variant="primary"
            >
              Delete
            </Button>
            {option.name !== "" && option.values.length &&
              <Button
                type="button"
                className="p-2 rounded-lg bg-primary py-2 text-sm text-white transition duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onClick={() => onDone(optionIndex)}
                variant="primary"
              >
                Done
              </Button>
            }
          </div>
        </>
      )}
    </div>
  );
});

export default OptionItem;
