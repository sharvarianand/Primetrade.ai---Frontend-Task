'use client';

import { useState, useMemo } from 'react';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskList } from '@/components/dashboard/TaskList';
import { TaskForm } from '@/components/dashboard/TaskForm';
import { FilterControls } from '@/components/dashboard/FilterControls';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { EmptyState } from '@/components/shared/EmptyState';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useTasks } from '@/hooks/useTasks';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Task } from '@/types';

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filters = useMemo(() => ({
    search: debouncedSearch,
    status: statusFilter,
    priority: priorityFilter,
    page: 1,
    limit: 50,
  }), [debouncedSearch, statusFilter, priorityFilter]);

  const { tasks, isLoading, createTask, updateTask, deleteTask, refetch } = useTasks(filters);

  const handleCreateTask = async (data: any) => {
    try {
      await createTask(data);
      await refetch();
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  };

  const handleUpdateTask = async (data: any) => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask.id, data);
      await refetch();
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTask(taskToDelete);
      await refetch();
      toast.success('Task deleted successfully');
      setIsDeleteConfirmOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const handleFormClose = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return <LoadingSkeleton variant="card" count={6} />;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      task.description?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Tasks</h1>
          <p className="text-text-secondary">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg bg-surface">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List size={18} />
            </Button>
          </div>

          <Button onClick={() => setIsTaskFormOpen(true)}>
            <Plus className="mr-2" size={20} />
            Add Task
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col gap-4"
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title or description..."
        />

        <FilterControls
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onClearFilters={handleClearFilters}
        />
      </motion.div>

      {filteredTasks.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <EmptyState
            title="No tasks found"
            description={
              debouncedSearch || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Create your first task to get started!'
            }
            actionText="Create Task"
            onAction={() => setIsTaskFormOpen(true)}
          />
        </motion.div>
      ) : viewMode === 'grid' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </motion.div>
      )}

      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialData={editingTask ? {
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
          dueDate: editingTask.dueDate || undefined
        } : undefined}
        isEdit={!!editingTask}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
