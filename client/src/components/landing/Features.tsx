'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Bell, Users, BarChart3, Shield, Zap } from 'lucide-react';
import { Beams } from '../ui/beams-background';
import { GlowingEffect } from '../ui/glowing-effect';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description: 'Get a bird\'s eye view of all your tasks with our beautifully designed dashboard.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
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
    <section id="features" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      {/* Beams Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <Beams
          beamWidth={4}
          beamHeight={10}
          beamNumber={6}
          speed={0.8}
          noiseIntensity={1.2}
          rotation={-20}
          scale={0.3}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Features</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Everything you need to manage your tasks and boost your productivity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />

                {/* Subtle top line - removal might be better if using glowing effect, keeping for now or remove? Let's keep it but maybe it conflicts visually. User asked for effect on all cards. */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 relative z-10">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
