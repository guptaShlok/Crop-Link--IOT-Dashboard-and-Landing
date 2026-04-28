'use client';

import { useEffect, useState, useRef } from 'react';

const features = [
  {
    number: '01',
    title: 'Real-Time Sensor Network',
    description: 'Deploy LoRa-powered nodes across your farmland. Continuously monitor soil moisture, temperature, humidity, and pH levels with millisecond precision.',
    metric: { value: '50k+', label: 'readings/hour' },
  },
  {
    number: '02',
    title: 'Intelligent Data Processing',
    description: 'Process sensor data at the edge and in the cloud. Automatic anomaly detection, threshold analysis, and pattern recognition for crop optimization.',
    metric: { value: '99.7%', label: 'uptime' },
  },
  {
    number: '03',
    title: 'Smart Alert System',
    description: 'Get instant notifications when conditions go out of range. Customizable thresholds, escalation rules, and integration with your favorite platforms.',
    metric: { value: '<1s', label: 'alert latency' },
  },
  {
    number: '04',
    title: 'Advanced Analytics Dashboard',
    description: 'Visualize trends, compare fields, and identify patterns. Historical data analysis, predictive insights, and yield optimization recommendations.',
    metric: { value: '10x', label: 'faster insights' },
  },
];

export function CropFeatures() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-40 overflow-hidden bg-black border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-24 lg:mb-32">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-6">
              <span className="w-12 h-px bg-white/30" />
              Capabilities
            </span>
            <h2
              className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] text-white transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Precision
              <br />
              <span className="text-white/40">agriculture.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-4">
            <p className={`text-lg text-white/70 leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Everything you need to monitor, analyze, and optimize your farm operations. From sensor deployment to actionable insights.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`relative group bg-white/5 border border-white/10 hover:border-white/30 p-8 lg:p-12 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onMouseEnter={() => setActiveFeature(idx)}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  {feature.number}
                </span>

                <h3 className="text-2xl lg:text-3xl font-display mt-4 mb-4 text-white group-hover:translate-x-2 transition-transform duration-300">
                  {feature.title}
                </h3>

                <p className="text-white/60 leading-relaxed mb-8">
                  {feature.description}
                </p>

                {/* Metric */}
                <div className="pt-6 border-t border-white/10 group-hover:border-white/30 transition-colors">
                  <span className="block text-4xl lg:text-5xl font-display text-white mb-2">
                    {feature.metric.value}
                  </span>
                  <span className="text-sm text-white/50 font-mono">
                    {feature.metric.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
