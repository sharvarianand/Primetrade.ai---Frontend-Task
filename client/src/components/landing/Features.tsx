'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LayoutDashboard, Bell, Users, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description: 'Get a bird\'s eye view of all your tasks with our beautifully designed dashboard.',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant notifications for task assignments and deadline reminders.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team members through shared workspaces and comments.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track your productivity with detailed charts and analytics on your performance.',
  },
  {
    icon: Shield,
    title: 'Bank-grade Security',
    description: 'Your data is protected with enterprise-grade encryption and security protocols.',
  },
  {
    icon: Zap,
    title: 'Lightning Performance',
    description: 'Experience blazing-fast load times and smooth interactions with our optimized platform.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to manage your tasks and boost your productivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-text-secondary">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
