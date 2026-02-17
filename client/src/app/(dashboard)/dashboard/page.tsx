'use client';

import { useState, useEffect } from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { motion } from 'framer-motion';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import type { Task } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    highPriority: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [tasksResponse, statsResponse] = await Promise.all([
        axios.get('/tasks?limit=5'),
        axios.get('/tasks/stats'),
      ]);
      setTasks(tasksResponse.data.data.tasks);
      setStats(statsResponse.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      await fetchDashboardData();
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task: Task) => {
    toast.info('Edit feature - navigate to Tasks page');
  };

  if (isLoading) {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Calendar size={16} />
            <span>{currentDate}</span>
          </div>
        </div>
        <Button onClick={() => window.location.href = '/tasks'}>
          <Plus className="mr-2" size={20} />
          New Task
        </Button>
      </motion.div>

      <StatsCards stats={stats} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Recent Tasks</h2>
          <button
            onClick={() => window.location.href = '/tasks'}
            className="text-primary text-sm hover:underline"
          >
            View All →
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
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
