'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'Crop Link gave us complete visibility into our fields. We increased yield by 23% in the first season by optimizing irrigation based on real-time soil data.',
    author: 'David Okafor',
    role: 'Farm Manager',
    company: 'Sunshine Acres',
    metric: { value: '+23%', label: 'yield increase' },
  },
  {
    quote: 'The alert system is incredibly fast. We caught a pest infestation within minutes of it starting, saving us thousands in crop damage.',
    author: 'Maria Santos',
    role: 'Agricultural Director',
    company: 'Verde Farms',
    metric: { value: '100%', label: 'pest detection' },
  },
  {
    quote: 'Managing 500 acres with Crop Link is like having 10 agronomists on staff. The analytics are unbelievable and saved us hours every week.',
    author: 'James Cooper',
    role: 'Operations Lead',
    company: 'Heritage Fields',
    metric: { value: '40h', label: 'saved weekly' },
  },
  {
    quote: 'The ROI was clear immediately. Lower water usage, better crop quality, and predictive insights that actually work. Best platform investment we made.',
    author: 'Sofia Chen',
    role: 'CEO',
    company: 'Horizon Agritech',
    metric: { value: '3.2x', label: 'ROI (6 months)' },
  },
];

const testimonialDotPattern = Array.from({ length: 40 }, (_, rowIndex) =>
  Array.from({ length: 100 }, (_, colIndex) =>
    (rowIndex * 13 + colIndex * 7) % 10 > 7 ? '▪' : ' '
  ).join('')
).join('\n');

export function CropTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-40 bg-white text-black border-t border-black/10 overflow-hidden"
    >
      {/* Pattern background */}
      <div className="absolute inset-0 font-mono text-[10px] text-black/[0.02] leading-tight overflow-hidden whitespace-pre select-none pointer-events-none">
        {testimonialDotPattern}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-black/40 mb-4">
              <span className="w-12 h-px bg-black/20" />
              Success Stories
            </span>
            <h2
              className={`text-4xl lg:text-5xl font-display transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Trusted by
              <span className="text-black/40"> leading farms.</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-4 border border-black/20 hover:bg-black/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="p-4 border border-black/20 hover:bg-black/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Quote side */}
          <div className="lg:col-span-7 relative">
            <span className="absolute -left-4 -top-8 text-[200px] font-display text-black/5 leading-none select-none">
              "
            </span>

            <div className="relative">
              <blockquote
                key={activeIndex}
                className="text-3xl lg:text-4xl xl:text-5xl font-display leading-[1.2] tracking-tight animate-fadeSlideIn"
              >
                {activeTestimonial.quote}
              </blockquote>

              {/* Author */}
              <div className="mt-12 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center font-display text-xl">
                  {activeTestimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-medium text-black">{activeTestimonial.author}</p>
                  <p className="text-black/60">
                    {activeTestimonial.role}, {activeTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards side */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            {/* Active metric */}
            <div
              key={`metric-${activeIndex}`}
              className="p-10 border border-black/20 bg-black/5 animate-fadeSlideIn"
            >
              <span className="text-7xl lg:text-8xl font-display block mb-4 text-black">
                {activeTestimonial.metric.value}
              </span>
              <span className="text-lg text-black/60">{activeTestimonial.metric.label}</span>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="flex-1 h-1 bg-black/20 overflow-hidden"
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  <div
                    className={`h-full bg-black transition-all duration-300 ${
                      idx === activeIndex ? 'w-full' : idx < activeIndex ? 'w-full opacity-40' : 'w-0'
                    }`}
                    style={idx === activeIndex ? { animation: 'progress 8s linear forwards' } : {}}
                  />
                </button>
              ))}
            </div>

            {/* Company list */}
            <div className="mt-4 pt-6 border-t border-black/10">
              <span className="text-xs font-mono text-black/30 uppercase tracking-widest block mb-4">
                Featured farms
              </span>
              <div className="flex flex-wrap gap-3">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.company}
                    onClick={() => goTo(idx)}
                    className={`px-4 py-2 text-sm border transition-all ${
                      idx === activeIndex
                        ? 'border-black/40 text-black'
                        : 'border-black/10 text-black/40 hover:border-black/30'
                    }`}
                  >
                    {t.company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
