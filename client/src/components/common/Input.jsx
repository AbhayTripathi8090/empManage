import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      startIcon: StartIcon,
      endIcon: EndIcon,
      type = 'text',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative rounded-lg shadow-sm">
          {StartIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <StartIcon className="w-4 h-4" />
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${
              StartIcon ? 'pl-9' : 'pl-3.5'
            } ${EndIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
              error
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/20 text-red-900 placeholder-red-300'
                : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 bg-white'
            } ${className}`}
            {...props}
          />

          {EndIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
              <EndIcon className="w-4 h-4" />
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
