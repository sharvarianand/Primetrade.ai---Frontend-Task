'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/types';
import axios from '@/lib/axios';

export function useTasks(filters: Record<string, any> = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [filters.search, filters.status, filters.priority, filters.page]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });

      const response = await axios.get('/tasks', { params });
      setTasks(response.data.data.tasks);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const response = await axios.post('/tasks', taskData);
      setTasks((prev) => [response.data.data.task, ...prev]);
      return response.data.data.task;
    } catch (err: any) {
      throw err;
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? response.data.data.task : task
        )
      );
      return response.data.data.task;
    } catch (err: any) {
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err: any) {
      throw err;
    }
  };

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
