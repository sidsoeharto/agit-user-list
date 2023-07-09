import React from 'react';

const InputField = ({ label, name, value, onChange, error, type = 'text', options }) => {
  const isSelectField = Array.isArray(options);

  return (
    <div className="mb-4">
      <label className="block font-semibold">{label}:</label>
      {isSelectField ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full"
        />
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;