import React, { memo } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import { VariantItemType } from "./types";

const VariantItem: React.FC<VariantItemType> = memo(({
  variant,
  variantIndex,
  onNameChange,
  onValueChange,
  onRemoveValue,
  onRemoveVariant,
  onDone,
  onEdit,
  errors
}) => {

  const variantNameError = errors?.name;
  const variantValuesError = errors?.values;

  return (
    <div className="border rounded-lg p-4 mb-4">
      {variant.done ? (
        <div className="cursor-pointer" onClick={() => onEdit(variantIndex)}>
          <h2 className="font-semibold">{variant.name}</h2>
          <div className="flex gap-2">
            {variant.values.map((val, index) => (
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
            id={`optionName${variantIndex}`}
            value={variant.name}
            onChange={(e) => onNameChange(variantIndex, e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Size"
            autoFocus
          />
          {variantNameError && (
            <div className="text-xs text-red-600 mt-1">{variantNameError}</div>
          )}
          <div className="mt-2">
            <label className="inline-block text-sm font-medium text-gray-700">Option values</label>
            <div className="space-y-2">
              {variant.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center">
                  <Input
                    name="value"
                    type="text"
                    id={`optionValue${variantIndex}-${valueIndex}`}
                    value={value}
                    onChange={(e) => onValueChange(variantIndex, valueIndex, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="XL"
                    deleteOptionHandle={variant.values.length > 1 ? () => onRemoveValue(variantIndex, valueIndex) : undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          {variantValuesError && (
            <div className="text-xs text-red-600 mt-1">{variantValuesError}</div>
          )}
          <div className="flex justify-between mt-2">
            <Button
              type="button"
              className="p-2 rounded-lg bg-red-600 py-2 text-sm text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => onRemoveVariant(variantIndex)}
              variant="primary"
            >
              Delete
            </Button>
            {variant.name !== "" && variant.values.length &&
              <Button
                type="button"
                className="p-2 rounded-lg bg-primary py-2 text-sm text-white transition duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                onClick={() => onDone(variantIndex)}
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

export default VariantItem;
