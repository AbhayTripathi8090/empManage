import React, { forwardRef } from 'react';

const Select = forwardRef(
  (
    {
      label,
      options = [],
      placeholder = 'Select an option',
      error,
      helperText,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <select
          id={selectId}
          ref={ref}
          className={`w-full text-sm rounded-lg border px-3.5 py-2.5 bg-white transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/20 text-red-900'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900'
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const optionLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
