import { Task } from '../models/Task.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { search, status, priority, page, limit, sortBy, sortOrder } = req.query;
    
    const filters = {
      search,
      status,
      priority,
      page,
      limit,
      sortBy,
      sortOrder,
    };
    
    const result = await Task.findByUser(userId, filters);
    
    return successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findById(id, userId);
    
    if (!task) {
      return errorResponse(res, 'Task not found', 404);
    }
    
    return successResponse(res, { task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user.id;
    
    const taskData = {
      userId,
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate,
    };
    
    const task = await Task.create(taskData);
    
    return successResponse(res, { task }, 'Task created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    const userId = req.user.id;
    
    const updateData = { title, description, status, priority, dueDate };
    
    const task = await Task.update(id, userId, updateData);
    
    return successResponse(res, { task }, 'Task updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await Task.delete(id, userId);
    
    return successResponse(res, null, 'Task deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const stats = await Task.getStats(userId);
    
    return successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};
