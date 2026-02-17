import { errorResponse } from '../utils/apiResponse.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return errorResponse(res, err.message, 400, err.errors);
  }
  
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }
  
  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }
  
  if (err.code === '23505') {
    return errorResponse(res, 'Resource already exists', 409);
  }
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  return errorResponse(res, message, statusCode);
};
