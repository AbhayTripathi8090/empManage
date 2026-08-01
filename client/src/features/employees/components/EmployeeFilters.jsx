import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';
import Button from '../../../components/common/Button';

const EmployeeFilters = ({ filters = {}, onFilterChange, onResetFilters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Debounce search input by 350ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== (filters.search || '')) {
        onFilterChange({ search: searchTerm });
      }
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm, filters.search, onFilterChange]);

  // Keep local search term synchronized if filters reset externally
  useEffect(() => {
    setSearchTerm(filters.search || '');
  }, [filters.search]);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Leave', label: 'On Leave' },
  ];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm mb-6 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Filter className="w-4 h-4 text-indigo-600" /> Filter & Search Employees
        </div>
        {(filters.search || filters.status) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="text-gray-500 hover:text-red-600"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="sm:col-span-2">
          <Input
            placeholder="Search by name, email, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startIcon={Search}
          />
        </div>

        {/* Status Filter Dropdown */}
        <Select
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          options={statusOptions}
          placeholder={null}
        />
      </div>
    </div>
  );
};

export default EmployeeFilters;
