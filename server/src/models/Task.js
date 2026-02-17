import { supabase } from '../config/db.js';

export class Task {
  static async create(taskData) {
    const { userId, title, description, status, priority, dueDate } = taskData;
    
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        title,
        description,
        status,
        priority,
        due_date: dueDate,
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return this.formatTask(data);
  }
  
  static async findByUser(userId, filters = {}) {
    let query = supabase
      .from('tasks')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters.priority && filters.priority !== 'all') {
      query = query.eq('priority', filters.priority);
    }
    
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const offset = (page - 1) * limit;
    
    if (filters.sortBy) {
      query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    query = query.range(offset, offset + limit - 1);
    
    const { data, error, count } = await query;
    
    if (error) {
      throw new Error(error.message);
    }
    
    return {
      tasks: data.map(this.formatTask),
      totalTasks: count || 0,
      currentPage: page,
      totalPages: Math.ceil(count / limit) || 1,
    };
  }
  
  static async findById(id, userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return this.formatTask(data);
  }
  
  static async update(id, userId, updateData) {
    const updates = {};
    
    if (updateData.title !== undefined) updates.title = updateData.title;
    if (updateData.description !== undefined) updates.description = updateData.description;
    if (updateData.status !== undefined) updates.status = updateData.status;
    if (updateData.priority !== undefined) updates.priority = updateData.priority;
    if (updateData.dueDate !== undefined) updates.due_date = updateData.dueDate;
    
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error('Failed to update task or task not found');
    }
    
    return this.formatTask(data);
  }
  
  static async delete(id, userId) {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error('Failed to delete task or task not found');
    }
    
    return true;
  }
  
  static async getStats(userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('status, priority')
      .eq('user_id', userId);
    
    if (error) {
      throw new Error(error.message);
    }
    
    const stats = {
      total: data.length,
      pending: 0,
      inProgress: 0,
      completed: 0,
      highPriority: 0,
    };
    
    data.forEach(task => {
      if (task.status === 'pending') stats.pending++;
      else if (task.status === 'in-progress') stats.inProgress++;
      else if (task.status === 'completed') stats.completed++;
      
      if (task.priority === 'high') stats.highPriority++;
    });
    
    return stats;
  }
  
  static formatTask(task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.due_date,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      userId: task.user_id,
    };
  }
}
