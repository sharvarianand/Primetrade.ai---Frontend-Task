import { verifyToken } from '../utils/generateToken.js';
import { errorResponse } from '../utils/apiResponse.js';
import { User } from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided', 401);
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return errorResponse(res, 'Invalid or expired token', 401);
    }
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }
    
    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Authentication failed', 401);
  }
};
