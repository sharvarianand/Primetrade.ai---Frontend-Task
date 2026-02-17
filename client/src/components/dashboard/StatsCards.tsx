'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function StatsCard({ title, value, icon, color, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="relative h-full"
    >
      <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />

        <div className="relative z-10 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-white/60">
              {title}
            </span>
            <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${color}`}>{icon}</div>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: delay + 0.05 }}
            className="text-4xl font-bold text-white mt-4"
          >
            {value}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

interface StatsCardsProps {
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    highPriority: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Tasks"
        value={stats.total}
        icon={<CheckSquare size={20} className="text-primary" />}
        color="bg-primary/10"
        delay={0}
      />
      <StatsCard
        title="Pending"
        value={stats.pending}
        icon={<Clock size={20} className="text-warning" />}
        color="bg-warning/10"
        delay={0.03}
      />
      <StatsCard
        title="In Progress"
        value={stats.inProgress}
        icon={<AlertCircle size={20} className="text-blue-500" />}
        color="bg-blue-500/10"
        delay={0.06}
      />
      <StatsCard
        title="Completed"
        value={stats.completed}
        icon={<CheckCircle size={20} className="text-success" />}
        color="bg-success/10"
        delay={0.09}
      />
    </div>
  );
}
