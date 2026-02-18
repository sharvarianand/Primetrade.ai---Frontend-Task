'use client';

import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, User as UserIcon, Menu } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { cn, getInitials } from '@/lib/utils';

export function Topbar({ onSearch, onToggleSidebar, isCollapsed }: { onSearch?: (value: string) => void; onToggleSidebar?: () => void; isCollapsed?: boolean }) {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300",
      "left-0",
      !isCollapsed ? "md:left-[260px]" : "md:left-16"
    )}>
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white md:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-white/80 transition-colors" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchValue}
              onChange={handleSearch}
              className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 hover:bg-white/10 transition-all rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button
          className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all text-white/60 hover:text-white border border-transparent hover:border-white/5"
          onClick={() => {
            // In a real app, this would open a notification dropdown
            import('sonner').then(mod => mod.toast.info('You have 3 unread notifications'));
          }}
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" />
        </button>

        <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-semibold text-sm shadow-inner group cursor-pointer hover:border-white/20 transition-all">
            {user?.name ? getInitials(user.name) : 'U'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-white/50">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
