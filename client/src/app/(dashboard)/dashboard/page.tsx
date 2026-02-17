'use client';

import { useState, useEffect } from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/context/TaskContext';
import { motion } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import type { Task } from '@/types';

import { TaskForm } from '@/components/dashboard/TaskForm';

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, stats, loading, deleteTask, createTask } = useTasks();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const handleEditTask = (task: Task) => {
    window.location.href = `/tasks`; // Redirect to tasks page for now
  };

  if (loading) {
    return <LoadingSkeleton variant="card" count={4} />;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <div className="flex items-center space-x-2 text-white/60">
            <Calendar size={16} />
            <span>{currentDate}</span>
          </div>
        </div>
        <Button
          onClick={() => setIsTaskFormOpen(true)}
          className="bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="mr-2" size={20} />
          New Task
        </Button>
      </motion.div>

      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={createTask}
      />

      <StatsCards stats={stats} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recent Tasks</h2>
          <button
            onClick={() => window.location.href = '/tasks'}
            className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1 group"
          >
            View All <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description="Create your first task to get started!"
            actionText="Create Task"
            onAction={() => window.location.href = '/tasks'}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
