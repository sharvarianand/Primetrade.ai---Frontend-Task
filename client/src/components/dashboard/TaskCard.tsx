'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                {task.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2">
                {truncate(task.description || '', 100)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant={getStatusColor(task.status)}>
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="text-text-secondary hover:text-primary"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-text-secondary hover:text-danger"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
