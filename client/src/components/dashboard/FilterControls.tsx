'use client';

import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface FilterControlsProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export function FilterControls({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: FilterControlsProps) {
  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3">
        <Search size={16} className="text-text-secondary" />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-transparent border-none text-sm"
        />
      </div>

      <div className="flex items-center space-x-2 bg-surface border border-border rounded-lg px-3">
        <Select
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="bg-transparent border-none text-sm"
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="text-text-secondary hover:text-text-primary"
        >
          <X size={16} className="mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}
