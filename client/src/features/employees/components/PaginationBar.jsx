import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../../components/common/Button';

const PaginationBar = ({ pagination = {}, onPageChange, onLimitChange }) => {
  const {
    totalCount = 0,
    totalPages = 1,
    currentPage = 1,
    limit = 10,
    hasNextPage = false,
    hasPrevPage = false,
  } = pagination;

  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="bg-white px-4 py-3 sm:px-6 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm mt-6">
      {/* Entry counter */}
      <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600">
        <span>
          Showing <span className="font-semibold text-gray-900">{startItem}</span> to{' '}
          <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalCount}</span> entries
        </span>

        {/* Per page limit dropdown */}
        {onLimitChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-gray-400">|</span>
            <span>Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="px-2 py-1 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasPrevPage || currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        <span className="text-xs font-semibold text-gray-700 px-3">
          Page {currentPage} of {totalPages || 1}
        </span>

        <Button
          variant="secondary"
          size="sm"
          disabled={!hasNextPage || currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationBar;
