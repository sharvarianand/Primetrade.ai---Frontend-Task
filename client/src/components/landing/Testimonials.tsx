'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Beams } from '../ui/beams-background';
import { GlowingEffect } from '../ui/glowing-effect';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    content: 'PrimeTrade Tasks has revolutionized how our team manages projects. The intuitive interface and powerful features have increased our productivity by 40%.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder at StartupXYZ',
    content: 'The best task management tool I\'ve ever used. Clean design, lightning fast, and the team collaboration features are exactly what we needed.',
    avatar: 'MR',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    role: 'Freelance Designer',
    content: 'As a freelancer, staying organized is crucial. PrimeTrade Tasks helps me track all my projects and deadlines effortlessly. Highly recommended!',
    avatar: 'EJ',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Beams
          beamWidth={5}
          beamHeight={12}
          beamNumber={4}
          speed={0.5}
          noiseIntensity={0.8}
          rotation={45}
          scale={0.4}
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
            <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Thousands</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            See what our users have to say about PrimeTrade Tasks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
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

                {/* Quote watermark */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-white/5 group-hover:text-white/10 transition-colors duration-500 relative z-10" />

                <div className="flex items-center mb-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-white/50 font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <p className="text-white/70 text-sm leading-relaxed relative z-10">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
