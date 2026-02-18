'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { Beams } from '@/components/ui/beams-background';

import { AIChatbot } from '@/components/dashboard/AIChatbot';
import { TaskProvider } from '@/context/TaskContext';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ProtectedRoute>
      <TaskProvider>
        <div className="min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden">
          {/* Beams Background */}
          <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
            <Beams
              beamWidth={4}
              beamHeight={12}
              beamNumber={8}
              speed={0.5}
              noiseIntensity={0.8}
              rotation={15}
              scale={0.4}
            />
          </div>

          {/* Radial Gradient Overlay */}
          <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-black/80 to-black pointer-events-none" />

          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <div className={cn(
            "relative z-10 transition-all duration-300",
            !isCollapsed ? "md:ml-[260px]" : "md:ml-16"
          )}>
            <Topbar
              onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
              isCollapsed={isCollapsed}
            />
            <main className="pt-24 p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
              {children}
            </main>
          </div>
          <AIChatbot />
        </div>
      </TaskProvider>
    </ProtectedRoute>
  );
}
