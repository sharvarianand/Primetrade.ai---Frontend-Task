'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? 64 : 260 }}
      animate={{ width: isCollapsed ? 64 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-black/40 backdrop-blur-xl border-r border-white/10 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/20">
                <span className="text-black font-bold text-lg">P</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">PrimeTrade</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300',
              'hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 group relative overflow-hidden',
              'text-white/60 hover:text-white border border-transparent hover:border-white/5'
            )}
          >
            <item.icon
              size={20}
              className={cn('flex-shrink-0 group-hover:text-white transition-colors')}
            />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-sm tracking-wide"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent group text-white/60 hover:text-red-400"
        >
          <LogOut size={20} className="flex-shrink-0 group-hover:text-red-400 transition-colors" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
