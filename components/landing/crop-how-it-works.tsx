'use client';

import { useEffect, useState, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Deploy Sensors',
    description: 'Install ESP32-based LoRa nodes in your fields. Each node covers up to 15km with low power consumption.',
    icon: '📡',
  },
  {
    number: '02',
    title: 'Setup Gateway',
    description: 'Place a LoRa gateway to collect data from all nodes. Single gateway can handle hundreds of nodes simultaneously.',
    icon: '🛰️',
  },
  {
    number: '03',
    title: 'Cloud Sync',
    description: 'Data automatically uploads to our MongoDB backend via Firebase. Real-time processing and secure storage.',
    icon: '☁️',
  },
  {
    number: '04',
    title: 'Get Insights',
    description: 'View beautiful analytics dashboards. Set custom alerts and get actionable recommendations for your crops.',
    icon: '📊',
  },
];

export function CropHowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-white/5 border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-6 justify-center">
            <span className="w-12 h-px bg-white/30" />
            How It Works
            <span className="w-12 h-px bg-white/30" />
          </span>
          <h2 className={`text-4xl lg:text-5xl font-display text-white mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            From sensors to insights
          </h2>
          <p className={`text-lg text-white/60 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Get your farm monitoring setup in minutes. Our platform handles everything from data collection to actionable insights.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for large screens */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Number badge */}
              <div className="relative z-20 mb-6">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-display text-white">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-display text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow for mobile */}
              {idx < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-6">
                  <div className="text-2xl text-white/30">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-white/60 mb-6">Ready to get started? Choose a plan and deploy in minutes.</p>
        </div>
      </div>
    </section>
  );
}
