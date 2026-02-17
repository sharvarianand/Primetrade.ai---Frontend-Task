import { User } from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getProfile = async (req, res, next) => {
  try {
    const { id, name, email, avatar, created_at } = req.user;
    
    return successResponse(res, {
      id,
      name,
      email,
      avatar,
      createdAt: created_at,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const userId = req.user.id;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (avatar !== undefined) updateData.avatar = avatar;
    
    const updatedUser = await User.update(userId, updateData);
    
    const userWithoutPassword = User.toJSON(updatedUser);
    
    return successResponse(
      res,
      { updatedUser: userWithoutPassword },
      'Profile updated successfully'
    );
  } catch (error) {
    next(error);
  }
};
