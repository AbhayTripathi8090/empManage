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
          <label htmlFor={inputId} className="block text-sm font-bold text-slate-700 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative rounded-xl shadow-sm">
          {StartIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <StartIcon className="w-4 h-4" />
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            className={`w-full text-sm rounded-xl border transition-all focus:outline-none focus:ring-2 ${
              StartIcon ? 'pl-9' : 'pl-3.5'
            } ${EndIcon ? 'pr-9' : 'pr-3.5'} py-2.5 ${
              error
                ? 'border-rose-300 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/40 text-rose-900 placeholder-rose-300'
                : 'border-slate-200 focus:ring-teal-500 focus:border-teal-500 text-slate-900 placeholder-slate-400 bg-white'
            } ${className}`}
            {...props}
          />

          {EndIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400">
              <EndIcon className="w-4 h-4" />
            </div>
          )}
        </div>

        {error && <p className="text-xs text-rose-600 mt-1 font-bold">{error}</p>}
        {!error && helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
