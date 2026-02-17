'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, type ProfileUpdateInput } from '@/lib/validations';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { getInitials, formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    },
  });

  const onSubmit = async (data: ProfileUpdateInput) => {
    try {
      setIsLoading(true);
      await updateProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    });
  };

  if (!user) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-text-primary mb-6">Profile</h1>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-text-primary">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-3xl">
              {user.name ? getInitials(user.name) : 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-text-primary mb-2">
                {user.name}
              </h2>
              <p className="text-text-secondary">{user.email}</p>

            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    id="name"
                    type="text"
                    className="pl-10"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-danger">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-danger">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                  <Input
                    id="avatar"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    className="pl-10"
                    {...register('avatar')}
                  />
                </div>
                {errors.avatar && (
                  <p className="text-sm text-danger">{errors.avatar.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Button type="submit" isLoading={isLoading}>
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-text-secondary">
                <User size={20} className="text-primary" />
                <span className="text-text-primary font-medium">
                  {user.name}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-text-secondary">
                <Mail size={20} className="text-primary" />
                <span>{user.email}</span>
              </div>
              {user.avatar && (
                <div className="mt-4">
                  <Label>Avatar</Label>
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover mt-2"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
