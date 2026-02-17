'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '@/lib/axios';
import { toast } from 'sonner';
import type { Task, TaskStatsResponse } from '@/types';

interface TaskStats {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    highPriority: number;
}

interface TaskContextType {
    tasks: Task[];
    stats: TaskStats;
    loading: boolean;
    fetchTasks: () => Promise<void>;
    createTask: (data: Partial<Task>) => Promise<void>;
    updateTask: (id: string, data: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [stats, setStats] = useState<TaskStats>({
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        highPriority: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            // setLoading(true); // Don't set loading to true on subsequent fetches to avoid flickering
            const [tasksRes, statsRes] = await Promise.all([
                axios.get('/tasks?limit=10'), // Fetch more for chatbot context
                axios.get('/tasks/stats'),
            ]);
            setTasks(tasksRes.data.data.tasks);
            setStats(statsRes.data.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            // Don't toast on initial load to avoid spam if auth fails briefly
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = async (data: Partial<Task>) => {
        try {
            await axios.post('/tasks', data);
            await fetchTasks();
            toast.success('Task created successfully');
        } catch (error: any) {
            console.error('Create task error:', error);
            toast.error(error.response?.data?.message || 'Failed to create task');
            throw error;
        }
    };

    const updateTask = async (id: string, data: Partial<Task>) => {
        try {
            await axios.put(`/tasks/${id}`, data);
            await fetchTasks();
            toast.success('Task updated successfully');
        } catch (error: any) {
            console.error('Update task error:', error);
            toast.error(error.response?.data?.message || 'Failed to update task');
            throw error;
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks((prev) => prev.filter((task) => task.id !== id));
            await fetchTasks(); // Refresh stats
            toast.success('Task deleted successfully');
        } catch (error: any) {
            console.error('Delete task error:', error);
            toast.error(error.response?.data?.message || 'Failed to delete task');
            throw error;
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                stats,
                loading,
                fetchTasks,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}
