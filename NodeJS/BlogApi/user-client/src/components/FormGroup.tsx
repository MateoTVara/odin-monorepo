import type { HTMLInputTypeAttribute } from "react";

type FormGroupProps = {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
};

const FormGroup = ({ id, label, type = 'text', name } : FormGroupProps) => {
  
  
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label
        htmlFor={id}
        className='text-sm font-medium'
      >
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        className='
          rounded-md border px-3 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500
          border-gray-300
          dark:border-gray-600 dark:bg-gray-700
        '
      />
    </div>
  );
};

export default FormGroup;