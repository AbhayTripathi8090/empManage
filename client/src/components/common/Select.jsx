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
          <label htmlFor={selectId} className="block text-sm font-bold text-slate-700 mb-1.5">
            {label}
          </label>
        )}

        <select
          id={selectId}
          ref={ref}
          className={`w-full text-sm rounded-xl border px-3.5 py-2.5 bg-white transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/40 text-rose-900'
              : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500 text-slate-900'
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

        {error && <p className="text-xs text-rose-600 mt-1 font-bold">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
