import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...', size = 'md', fullScreen = false }) => {
  const spinnerSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
      <Loader2 className={`${spinnerSizes[size] || spinnerSizes.md} text-teal-600 animate-spin`} />
      {message && <p className="text-sm font-bold text-slate-500">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
