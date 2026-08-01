import React from 'react';
import { FolderOpen } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="surface-card flex flex-col items-center justify-center p-12 rounded-2xl text-center">
      <div className="p-4 bg-teal-50 text-teal-700 rounded-2xl mb-4 ring-1 ring-teal-100">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-black text-slate-950 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
