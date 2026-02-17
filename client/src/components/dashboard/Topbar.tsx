'use client';

import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { cn, getInitials } from '@/lib/utils';

export function Topbar({ onSearch }: { onSearch?: (value: string) => void }) {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <header className="fixed top-0 right-0 left-[260px] h-16 bg-surface/80 backdrop-blur-lg border-b border-border z-40 px-6 flex items-center justify-between transition-all duration-300">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={handleSearch}
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-lg hover:bg-background/50 transition-colors text-text-secondary hover:text-text-primary">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
            {user?.name ? getInitials(user.name) : 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-text-primary">{user?.name}</p>
            <p className="text-xs text-text-secondary">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
