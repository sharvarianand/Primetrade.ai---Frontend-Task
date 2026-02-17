'use client';

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'avatar';
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className="space-y-3">
            <div className="h-4 bg-border/50 rounded animate-pulse" />
            <div className="h-3 bg-border/30 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-border/30 rounded animate-pulse w-1/2" />
          </div>
        );
      case 'list':
        return (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-border/50 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-border/30 rounded animate-pulse" />
              <div className="h-3 bg-border/20 rounded animate-pulse w-1/2" />
            </div>
          </div>
        );
      case 'avatar':
        return (
          <div className="w-10 h-10 bg-border/50 rounded-full animate-pulse" />
        );
      default:
        return (
          <div className="h-4 bg-border/50 rounded animate-pulse" />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card/50 rounded-lg border border-border p-4"
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </motion.div>
  );
}
