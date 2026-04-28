'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BlurWord } from './blur-word';
import { CropFeatures } from './crop-features';
import { CropTestimonials } from './crop-testimonials';
// import { CropPricing } from './crop-pricing';
import { CropHowItWorks } from './crop-how-it-works';

const words = ['grow', 'thrive', 'yield', 'prosper'];

export function CropLinkLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-white">🌾</span>
            <span className="text-lg font-bold text-white">Crop Link</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-white hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-white text-black hover:bg-white/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black pt-20">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-60"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-white/10"
              style={{
                top: `${12.5 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-white/10"
              style={{
                left: `${8.33 * (i + 1)}%`,
                top: 0,
                bottom: 0,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
          <div className="lg:max-w-[55%]">
            {/* Eyebrow */}
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
                <span className="w-8 h-px bg-white/30" />
                Smart IoT monitoring for agriculture
              </span>
            </div>

            {/* Main headline */}
            <div className="mb-12">
              <h1
                className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-white transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="block whitespace-nowrap">Real-time crop</span>
                <span className="block whitespace-nowrap">
                  intelligence to{' '}
                  <span className="relative inline-block">
                    <BlurWord word={words[wordIndex]} trigger={wordIndex} />
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <div
              className={`mb-12 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-lg text-white/70 max-w-xl">
                Monitor your fields with LoRa-powered sensors. Get instant alerts, advanced analytics, and data-driven insights to maximize yield and minimize waste.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
                  Start Monitoring <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 z-10 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
            {[
              { value: '50k+', label: 'sensor readings/hour' },
              { value: '99.7%', label: 'uptime guarantee' },
              { value: '<1s', label: 'alert latency' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-3xl lg:text-4xl font-display text-white">{stat.value}</span>
                <span className="text-xs text-white/50 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Premium Component */}
      <CropFeatures />

      {/* How It Works - Premium Component */}
      <CropHowItWorks />

      {/* Testimonials Section - Premium Component */}
      <CropTestimonials />

      {/* Pricing Section - Premium Component
      <CropPricing /> */}

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black/50 to-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-display text-white mb-6">
            Ready to transform your farm?
          </h2>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Join thousands of farmers already using Crop Link to increase yields, reduce costs, and make smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🌾</span>
                <span className="text-lg font-bold text-white">Crop Link</span>
              </div>
              <p className="text-white/60">Smart IoT monitoring for modern agriculture</p>
            </div>
            <div className="flex gap-12">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition">Docs</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60 pt-8">
            <div>© 2026 Crop Link. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
