'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Check, X } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-danger';
    if (strength === 2) return 'bg-warning';
    if (strength === 3) return 'bg-primary';
    return 'bg-success';
  };

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      await registerUser(data.name, data.email, data.password);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Register error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Create Account
          </h1>
          <p className="text-text-secondary">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="pl-10"
                {...register('name')}
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-danger"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-danger"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="pl-10"
                {...register('password')}
                onChange={(e) => {
                  setPasswordStrength(checkPasswordStrength(e.target.value));
                }}
              />
            </div>
            {password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full ${level <= passwordStrength
                        ? getPasswordStrengthColor(passwordStrength)
                        : 'bg-border'
                      }`}
                  />
                ))}
              </div>
            )}
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-danger"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-danger"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-text-secondary text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </motion.div>
  );
}
