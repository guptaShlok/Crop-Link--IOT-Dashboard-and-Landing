// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { Check, Zap } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const plans = [
//   {
//     name: 'Starter',
//     description: 'For small farms getting started',
//     price: { monthly: 0, annual: 0 },
//     features: [
//       'Up to 5 sensor nodes',
//       '10,000 readings/month',
//       'Web dashboard',
//       'Basic email alerts',
//       'Community support',
//     ],
//     cta: 'Get Started Free',
//     highlight: false,
//   },
//   {
//     name: 'Professional',
//     description: 'For growing farm operations',
//     price: { monthly: 49, annual: 39 },
//     features: [
//       'Up to 50 sensor nodes',
//       'Unlimited readings',
//       'Advanced analytics',
//       'Smart alerts & integrations',
//       'Mobile app access',
//       'Priority support',
//       'Custom thresholds',
//     ],
//     cta: 'Start Free Trial',
//     highlight: true,
//   },
//   {
//     name: 'Enterprise',
//     description: 'For large-scale operations',
//     price: { monthly: null, annual: null },
//     features: [
//       'Unlimited sensor nodes',
//       'Unlimited readings',
//       'On-premise deployment',
//       'Dedicated account manager',
//       'Custom integrations',
//       '24/7 phone support',
//       'SLA guarantee',
//       'Advanced security',
//     ],
//     cta: 'Contact Sales',
//     highlight: false,
//   },
// ];

// export function CropPricing() {
//   const [isAnnual, setIsAnnual] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setIsVisible(true);
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section id="pricing" ref={sectionRef} className="relative py-24 lg:py-40 bg-black border-t border-white/10">
//       <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
//         {/* Header */}
//         <div className="grid lg:grid-cols-12 gap-8 mb-20">
//           <div className="lg:col-span-7">
//             <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-8">
//               <span className="w-12 h-px bg-white/30" />
//               Pricing
//             </span>
//             <h2
//               className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] text-white transition-all duration-1000 ${
//                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               Simple
//               <br />
//               <span className="text-white/40">pricing.</span>
//             </h2>
//           </div>

//           <div className="lg:col-span-5 relative flex items-end h-96 lg:h-auto justify-end">
//             {/* Decorative element */}
//             <div
//               className={`text-9xl font-display text-white/10 select-none transition-all duration-1000 delay-200 ${
//                 isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
//               }`}
//             >
//               🌾
//             </div>
//           </div>
//         </div>

//         {/* Billing toggle */}
//         <div
//           className={`flex justify-center mb-16 transition-all duration-1000 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <div className="inline-flex items-center gap-4 p-1 border border-white/20 rounded-lg bg-white/5">
//             <button
//               onClick={() => setIsAnnual(false)}
//               className={`px-4 py-2 rounded transition-all ${
//                 !isAnnual
//                   ? 'bg-white text-black font-semibold'
//                   : 'text-white/60 hover:text-white'
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setIsAnnual(true)}
//               className={`px-4 py-2 rounded transition-all ${
//                 isAnnual
//                   ? 'bg-white text-black font-semibold'
//                   : 'text-white/60 hover:text-white'
//               }`}
//             >
//               Annual (Save 20%)
//             </button>
//           </div>
//         </div>

//         {/* Pricing cards */}
//         <div className="relative grid lg:grid-cols-3 gap-6 lg:gap-0">
//           {plans.map((plan, index) => (
//             <div
//               key={plan.name}
//               className={`relative bg-white/5 border transition-all duration-700 ${
//                 plan.highlight
//                   ? 'border-white lg:-mx-2 lg:z-10 lg:scale-105 bg-white/10'
//                   : 'border-white/10 lg:first:-mr-2 lg:last:-ml-2'
//               } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               {/* Popular badge */}
//               {plan.highlight && (
//                 <div className="absolute -top-4 left-8 right-8 flex justify-center">
//                   <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-mono uppercase tracking-widest rounded">
//                     <Zap className="w-3 h-3" />
//                     Most Popular
//                   </span>
//                 </div>
//               )}

//               <div className="p-8 lg:p-10">
//                 {/* Header */}
//                 <div className="mb-8 pb-8 border-b border-white/10">
//                   <span className="font-mono text-xs text-white/40">{String(index + 1).padStart(2, '0')}</span>
//                   <h3 className="text-2xl lg:text-3xl font-display mt-2 text-white">{plan.name}</h3>
//                   <p className="text-sm text-white/60 mt-2">{plan.description}</p>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-8">
//                   {plan.price.monthly !== null ? (
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-5xl lg:text-6xl font-display text-white">
//                         ${isAnnual ? plan.price.annual : plan.price.monthly}
//                       </span>
//                       <span className="text-white/60 text-sm">/month</span>
//                     </div>
//                   ) : (
//                     <span className="text-4xl font-display text-white">Custom</span>
//                   )}
//                   {plan.price.monthly !== null && plan.price.monthly > 0 && (
//                     <p className="text-xs text-white/40 mt-2 font-mono">
//                       {isAnnual ? 'billed annually' : 'billed monthly'}
//                     </p>
//                   )}
//                 </div>

//                 {/* Features */}
//                 <ul className="space-y-3 mb-10">
//                   {plan.features.map((feature) => (
//                     <li key={feature} className="flex items-start gap-3">
//                       <Check className="w-4 h-4 text-white/60 mt-0.5 shrink-0" />
//                       <span className="text-sm text-white/70">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* CTA */}
//                 <Button
//                   className={`w-full transition-all ${
//                     plan.highlight
//                       ? 'bg-white text-black hover:bg-white/90'
//                       : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/5'
//                   }`}
//                   variant={plan.highlight ? 'default' : 'outline'}
//                   size="lg"
//                 >
//                   {plan.cta}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom callout */}
//         <div
//           className={`mt-20 pt-12 border-t border-white/10 transition-all duration-1000 delay-500 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
//             <div className="flex flex-wrap gap-6 text-sm text-white/60">
//               <span className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-white/60" />
//                 No credit card required
//               </span>
//               <span className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-white/60" />
//                 Cancel anytime
//               </span>
//               <span className="flex items-center gap-2">
//                 <Check className="w-4 h-4 text-white/60" />
//                 Data portability guaranteed
//               </span>
//             </div>
//             <a href="#" className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4">
//               Compare all features →
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
