import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | null): string {
  if (!date) return 'No date';
  const d = date.includes('T') ? new Date(date) : new Date(date.replace(/-/g, '/'));
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status === 'completed') return false;

  // Use slashes for YYYY-MM-DD to force local time parsing in most browsers
  const due = dueDate.includes('T') ? new Date(dueDate) : new Date(dueDate.replace(/-/g, '/'));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDateOnly = new Date(due);
  dueDateOnly.setHours(0, 0, 0, 0);

  return dueDateOnly < today;
}
