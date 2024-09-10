import React from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  required
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className="border border-gray-300 block w-full rounded-md py-3 px-4"
        />
      </div>
    </div>
  );
};

export default FormField;
