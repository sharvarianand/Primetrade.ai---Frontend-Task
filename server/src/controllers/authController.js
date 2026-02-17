import { User } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'Email already registered', 409);
    }
    
    const user = await User.create({ name, email, password });
    
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    
    const userWithoutPassword = User.toJSON(user);
    
    return successResponse(
      res,
      {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
      'Registration successful',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findByEmail(email);
    
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }
    
    const isPasswordValid = await User.comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials', 401);
    }
    
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    
    const userWithoutPassword = User.toJSON(user);
    
    return successResponse(
      res,
      {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
      'Login successful'
    );
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token required', 400);
    }
    
    const { verifyToken } = await import('../utils/generateToken.js');
    const decoded = verifyToken(refreshToken);
    
    if (!decoded) {
      return errorResponse(res, 'Invalid refresh token', 401);
    }
    
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }
    
    const newAccessToken = generateAccessToken(user.id);
    
    return successResponse(
      res,
      { accessToken: newAccessToken },
      'Token refreshed successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    return successResponse(res, null, 'Logout successful');
  } catch (error) {
    next(error);
  }
};
