'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { CheckSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-bold text-text-primary"
          >
            {value}
          </motion.div>
        </CardContent>
      </Card>
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
        delay={0.1}
      />
      <StatsCard
        title="In Progress"
        value={stats.inProgress}
        icon={<AlertCircle size={20} className="text-blue-500" />}
        color="bg-blue-500/10"
        delay={0.2}
      />
      <StatsCard
        title="Completed"
        value={stats.completed}
        icon={<CheckCircle size={20} className="text-success" />}
        color="bg-success/10"
        delay={0.3}
      />
    </div>
  );
}
