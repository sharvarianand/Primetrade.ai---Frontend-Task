'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Star, Quote } from 'lucide-react';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            See what our users have to say about PrimeTrade Tasks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-border bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-text-primary text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-text-secondary">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>

                  <p className="text-text-secondary text-sm relative">
                    <Quote className="absolute -top-2 -left-1 w-6 h-6 text-primary/20" />
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
