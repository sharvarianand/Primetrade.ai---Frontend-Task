import bcrypt from 'bcryptjs';
import { supabase } from '../config/db.js';

export class User {
  static async create(userData) {
    const { name, email, password } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        avatar: null,
      })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        throw new Error('Email already exists');
      }
      throw new Error(error.message);
    }
    
    return data;
  }
  
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return data;
  }
  
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return data;
  }
  
  static async update(id, updateData) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error('Failed to update user');
    }
    
    return data;
  }
  
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  
  static toJSON(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
