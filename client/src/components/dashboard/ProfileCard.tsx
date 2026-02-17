'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Mail, Calendar, Camera } from 'lucide-react';
import { getInitials, formatDate } from '@/lib/utils';
import type { User as UserType } from '@/types';

interface ProfileCardProps {
  user: UserType;
  isEditing?: boolean;
  onEditToggle?: () => void;
}

export function ProfileCard({ user, isEditing = false, onEditToggle }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-border bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gradient-primary">
          <CardTitle className="text-white">Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-white font-bold text-2xl">
                {user.name ? getInitials(user.name) : 'U'}
              </div>
            )}
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-text-primary mb-1">
                {user.name}
              </h2>
              <p className="text-sm text-text-secondary mb-3">{user.email}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} className="text-primary" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
            
            {!isEditing && onEditToggle && (
              <Button onClick={onEditToggle} size="sm">
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
