import React, { memo } from 'react';
import Button from '@/components/common/Button';
import OptionItem from './OptionItem';
import Card from '@/components/common/Card';

const VariantsSection = memo(({ formik }: any) => {

  const handleOptionChange = (index: number, name: string) => {
    const newOptions = [...formik.values.options];
    newOptions[index].name = name;
    formik.setFieldValue('options', newOptions);
  };

  const handleValueChange = (optionIndex: number, valueIndex: number, value: string) => {
    const newOptions = [...formik.values.options];
    newOptions[optionIndex].values[valueIndex] = value;
    formik.setFieldValue('options', newOptions);

    if (newOptions[optionIndex].values.length - 1 === valueIndex && value) {
      newOptions[optionIndex].values.push(""); // Add a new empty value if needed
      formik.setFieldValue('options', newOptions);
    }
  };

  const removeValue = (optionIndex: number, valueIndex: number) => {
    const newOptions = [...formik.values.options];
    newOptions[optionIndex].values.splice(valueIndex, 1);
    formik.setFieldValue('options', newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = formik.values.options.filter((_: any, i: number) => i !== index);
    formik.setFieldValue('options', newOptions);
  };

  const addOption = () => {
    const blankOption = { name: '', values: [''], done: false };
    if (formik.values.options.length < 3) {
      formik.setFieldValue('options', [...formik.values.options, blankOption]);
    }
  };

  const handleDone = (index: number) => {
    const optionData = formik.values.options[index];
    let hasErrors = false;

    if (!optionData.name.trim()) {
      formik.setFieldError(`options[${index}].name`, 'Option name cannot be empty.');
      hasErrors = true;
    }

    if (optionData.values.every((v: string) => !v.trim())) {
      formik.setFieldError(`options[${index}].values`, 'Values cannot be empty.');
      hasErrors = true;
    }

    if (!hasErrors) {
      const updatedOptions = [...formik.values.options];
      updatedOptions[index] = { ...updatedOptions[index], done: true, values: optionData.values.filter(Boolean) };
      formik.setFieldValue('options', updatedOptions);
    }
  };

  const handleEdit = (index: number) => {
    const newOptions = [...formik.values.options];
    newOptions[index].done = false;
    newOptions[index].values.push(""); // Add an empty value for editing
    formik.setFieldValue('options', newOptions);
  };

  return (
    <Card className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className="text-lg font-semibold">Variants</h2>
        <Button className='border text-gray-700 px-4 py-2 rounded' disabled>Show variants</Button>
      </div>
      <label className="block text-sm font-medium text-gray-700">Options</label>
      {formik.values.options.length === 0 ? (
        <div className="text-sm text-gray-500">No options added yet. Click &quot;Add Option&quot; to start.</div>
      ) : (
        formik.values.options.map((option: any, index: number) => (
          <OptionItem
            key={index}
            option={option}
            optionIndex={index}
            onNameChange={handleOptionChange}
            onValueChange={handleValueChange}
            onRemoveValue={removeValue}
            onRemoveOption={removeOption}
            onDone={handleDone}
            onEdit={handleEdit}
            errors={formik.errors.options?.[index]}
          />
        ))
      )}
      {formik.values.options.length < 3 && (
        <Button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={addOption}
        >
          Add Option
        </Button>
      )}
    </Card>
  );
});

export default VariantsSection;
