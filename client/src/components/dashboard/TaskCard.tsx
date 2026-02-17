'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { formatDate, truncate } from '@/lib/utils';
import type { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function TaskCard({ task, onEdit, onDelete, index }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'info';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'default';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: index * 0.02 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group"
    >
      <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-lg text-white mb-2 line-clamp-1 group-hover:text-white/90 transition-colors">
                {task.title}
              </h3>
              <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
                {truncate(task.description || '', 100)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant={getStatusColor(task.status)}>
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div className={`flex items-center space-x-2 text-xs ${new Date(task.dueDate || '').getTime() < Date.now() && task.status !== 'completed'
            ? 'text-red-400 font-medium'
            : 'text-white/40'
            }`}>
            <Calendar size={14} />
            <span>
              {formatDate(task.dueDate)}
              {new Date(task.dueDate || '').getTime() < Date.now() && task.status !== 'completed' && ' (Overdue)'}
            </span>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(task)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
