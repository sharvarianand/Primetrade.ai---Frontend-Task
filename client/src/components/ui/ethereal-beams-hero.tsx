"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Github, Star } from "lucide-react"
import { Beams } from "./beams-background"

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "lg"
    children: React.ReactNode
}

const Button = ({ variant = "default", size = "sm", className = "", children, ...props }: ButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
        default: "bg-white text-black hover:bg-gray-100",
        outline: "border border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
        ghost: "text-white/90 hover:text-white hover:bg-white/10",
    }

    const sizes = {
        sm: "h-9 px-4 py-2 text-sm",
        lg: "px-8 py-6 text-lg",
    }

    return (
        <button
            className={`group relative overflow-hidden rounded-full ${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center">{children}</span>
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </button>
    )
}

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

/**
 * Ethereal Beams Hero
 *
 * A mesmerizing hero section featuring animated 3D light beams with glassmorphic navigation.
 * Perfect for modern SaaS, creative agencies, and tech startups looking to make a bold first impression.
 *
 * Features:
 * - Animated 3D light beams background
 * - Glassmorphic pill-shaped navigation
 * - Shimmer button effects
 * - Fully responsive design
 * - Black & white aesthetic
 */
export default function EtherealBeamsHero() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black">
            {/* Beams Background */}
            <div className="absolute inset-0 z-0">
                <Beams
                    beamWidth={2.5}
                    beamHeight={18}
                    beamNumber={15}
                    lightColor="#ffffff"
                    speed={2.5}
                    noiseIntensity={2}
                    scale={0.15}
                    rotation={43}
                />
            </div>

            {/* Glassmorphic Navbar */}
            <nav className="relative z-20 w-full">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Brand Name Only */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <span className="text-black font-bold text-lg">P</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tighter">PrimeTrade</span>
                        </div>

                        {/* Glassmorphic Navigation Pills */}
                        <div className="hidden md:flex items-center space-x-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1 -mr-6">
                            <a
                                href="#"
                                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                            >
                                Home
                            </a>
                            <a
                                href="#features"
                                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                            >
                                Features
                            </a>
                            <a
                                href="#testimonials"
                                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                            >
                                Testimonials
                            </a>
                            <a
                                href="/login"
                                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all hover:bg-white/10 hover:text-white"
                            >
                                Login
                            </a>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-4">
                            <Button size="sm" onClick={() => window.location.href = '/register'}>
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 text-sm text-white/90">
                            <Star className="mr-2 h-4 w-4 text-white" />
                            {"Smart Task Management"}
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Master your{' '}
                            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                tasks
                            </span>
                            ,<br />
                            amplify your productivity
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-10 text-lg leading-8 text-white/80 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                            The ultimate task management platform designed for teams and individuals. Organize, prioritize, and achieve more with intelligent workflows.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Button size="lg" className="shadow-2xl shadow-white/25 font-semibold" onClick={() => window.location.href = '/register'}>
                                Start Creating
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="font-semibold bg-transparent" onClick={() => window.location.href = '#features'}>
                                Learn More
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">10k+</div>
                                <div className="text-white/60 text-sm">Teams</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">50M+</div>
                                <div className="text-white/60 text-sm">Tasks Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                                <div className="text-white/60 text-sm">Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.5,
                    duration: 1,
                    ease: "easeOut"
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <button
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex flex-col items-center gap-3 group px-4 py-2"
                >
                    <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-semibold tracking-[0.3em] uppercase">
                        Explore
                    </span>
                    <div className="relative w-10 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-start py-3 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500 overflow-hidden">
                        <motion.div
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                        </motion.div>
                    </div>
                </button>
            </motion.div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>
    )
}
