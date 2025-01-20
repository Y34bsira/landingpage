'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .glimmer-card {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .glimmer-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(248, 100, 34, 0.03),
            rgba(248, 100, 34, 0.06),
            rgba(248, 100, 34, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .glimmer-pill {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .glimmer-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(248, 100, 34, 0.03),
            rgba(248, 100, 34, 0.06),
            rgba(248, 100, 34, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 600px;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }

        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }

        .feature-box {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .feature-box::before {
          content: '';
          position: absolute;
          width: 1000px;
          height: 1000px;
          background: radial-gradient(
            circle,
            rgba(248, 100, 34, 0.18) 0%,
            rgba(248, 100, 34, 0.12) 15%,
            rgba(248, 100, 34, 0.08) 25%,
            rgba(248, 100, 34, 0.04) 50%,
            transparent 70%
          );
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
          filter: blur(20px);
        }

        .feature-box:hover::before {
          opacity: 1;
        }

        .feature-box:hover {
          border-color: rgba(248, 100, 34, 0.4);
          background: rgba(23, 23, 23, 0.95);
        }

        .demo-button {
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .demo-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(248, 100, 34, 0.2);
        }

        .demo-button:hover span {
          transform: scale(1.02);
          color: black;
        }

        .tier-text {
          position: relative;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          display: inline-block;
        }

        .tier-text::before {
          content: '';
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(248, 100, 34, 0.08) 0%,
            rgba(248, 100, 34, 0.06) 20%,
            rgba(248, 100, 34, 0.04) 40%,
            rgba(248, 100, 34, 0.02) 60%,
            transparent 80%
          );
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: blur(30px);
        }

        .tier-text:hover {
          color: white;
        }

        .tier-text:hover::before {
          opacity: 1;
        }

        .feature-list-item {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .feature-list-item svg {
          flex-shrink: 0;
        }

        .feature-list-item span {
          position: relative;
        }

        .feature-list-item span::before {
          content: '';
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(248, 100, 34, 0.15) 0%,
            rgba(248, 100, 34, 0.1) 25%,
            rgba(248, 100, 34, 0.05) 50%,
            transparent 70%
          );
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
          filter: blur(20px);
          z-index: -1;
        }

        .feature-list-item:hover {
          color: rgba(248, 100, 34, 1);
        }

        .feature-list-item:hover span::before {
          opacity: 1;
        }
      `}</style>

      {/* Navigation */}
      <header className="flex items-center justify-between py-4 px-6 border-b border-neutral-800/50">
        <Link href="/" className="text-lg font-semibold">
          Gymers
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <a href="https://calendly.com/gymersapp/30min" target="_blank" rel="noopener noreferrer">Book a Demo</a>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          <div className="hero-glow" />
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center px-3 py-1 text-sm text-neutral-400 mb-8 glimmer-pill fade-in">
              <span 
                className="tier-text"
                onMouseMove={(e) => {
                  const text = e.currentTarget;
                  const rect = text.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  text.style.setProperty('--x', `${x}px`);
                  text.style.setProperty('--y', `${y}px`);
                }}
              >Three-Tier Software Package for Modern Gyms</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight fade-in delay-1">
              Power Your Gym&apos;s<br />Success Story
            </h1>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto fade-in delay-2">
              Streamline operations, boost member engagement, and grow your fitness business with our comprehensive gym management solution.
            </p>
            <div className="fade-in delay-3">
              <Button size="lg" className="demo-button rounded-full bg-[#F86422] text-white font-bold" asChild>
                <a href="https://calendly.com/gymersapp/30min" target="_blank" rel="noopener noreferrer">
                  <span className="inline-block transition-transform duration-300">Book a Demo Now</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto scroll-animation">
            <div className="glimmer-card">
              <div className="bg-neutral-900">
                <div className="flex items-center gap-2 p-2 md:p-3 border-b border-neutral-800">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row h-[500px] md:h-[700px]">
                  {/* Sidebar */}
                  <div className="hidden md:block md:w-64 border-r border-neutral-800 p-4 flex-shrink-0">
                    <div className="flex items-center gap-2 p-2 bg-neutral-800 rounded-lg mb-4">
                      <div className="w-8 h-8 rounded-full bg-neutral-700" />
                      <span>Gymers Suite</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Basic Plan</span>
                        <span className="text-sm text-neutral-500">$99/mo</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Pro Plan</span>
                        <span className="text-sm text-neutral-500">$199/mo</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>Enterprise</span>
                        <span className="text-sm text-neutral-500">Custom</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-neutral-800 transition-colors">
                        <span>ROI</span>
                        <span className="text-sm text-green-500">300%+</span>
                      </div>
                    </div>
                  </div>
                  {/* Mobile Stats Bar */}
                  <div className="md:hidden w-full border-b border-neutral-800 p-3 bg-neutral-800/50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-700" />
                        <span className="text-sm font-medium">Gymers Suite</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-neutral-400">3 Tiers</span>
                        <span className="text-green-500 font-medium">300%+ ROI</span>
                      </div>
                    </div>
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col p-3 md:p-4 overflow-hidden">
                    <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                      <div className="p-4 rounded-lg bg-neutral-800">
                        <div className="flex items-center gap-3 md:gap-4 mb-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-neutral-700 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm md:text-base">Basic Plan</h3>
                            <p className="text-xs md:text-sm text-neutral-400">Perfect for Small Gyms</p>
                          </div>
                          <div className="text-xs md:text-sm text-green-400 flex-shrink-0">
                            Starting at $99/mo
                          </div>
                        </div>
                        <p className="text-sm text-neutral-300">
                          • Member Management<br/>
                          • Basic Scheduling<br/>
                          • Payment Processing<br/>
                          • Access Control<br/>
                          • Basic Reports
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-neutral-800">
                        <div className="flex items-center gap-3 md:gap-4 mb-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-neutral-700 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm md:text-base">Pro Plan</h3>
                            <p className="text-xs md:text-sm text-neutral-400">For Growing Fitness Centers</p>
                          </div>
                          <div className="text-xs md:text-sm text-green-400 flex-shrink-0">
                            Starting at $199/mo
                          </div>
                        </div>
                        <p className="text-sm text-neutral-300">
                          • Everything in Basic<br/>
                          • Advanced Analytics<br/>
                          • Automated Marketing<br/>
                          • Staff Management<br/>
                          • Mobile App
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-neutral-800">
                        <div className="flex items-center gap-3 md:gap-4 mb-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-neutral-700 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm md:text-base">Enterprise</h3>
                            <p className="text-xs md:text-sm text-neutral-400">For Gym Chains & Franchises</p>
                          </div>
                          <div className="text-xs md:text-sm text-green-400 flex-shrink-0">
                            Custom Pricing
                          </div>
                        </div>
                        <p className="text-sm text-neutral-300">
                          • Everything in Pro<br/>
                          • Custom Integrations<br/>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24 scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Gym&apos;s Operations</h2>
              <p className="text-neutral-400">Streamline every aspect of your fitness business.</p>
            </div>

            <div className="relative">
              {/* Decorative line connecting the steps */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-800 via-[#F86422]/20 to-neutral-800 hidden md:block" />
              
              <div className="grid md:grid-cols-3 gap-24 relative">
                <div 
                  className="feature-box bg-neutral-900 p-8 rounded-xl border border-neutral-800 scroll-animation scroll-delay-1"
                  onMouseMove={(e) => {
                    const box = e.currentTarget;
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    box.style.setProperty('--x', `${x}px`);
                    box.style.setProperty('--y', `${y}px`);
                  }}
                >
                  <div className="text-2xl mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Member Management</h3>
                  <p className="text-neutral-400">
                    Effortlessly manage memberships, track attendance, and handle billing all in one place.
                  </p>
                </div>

                <div 
                  className="feature-box bg-neutral-900 p-8 rounded-xl border border-neutral-800 scroll-animation scroll-delay-2"
                  onMouseMove={(e) => {
                    const box = e.currentTarget;
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    box.style.setProperty('--x', `${x}px`);
                    box.style.setProperty('--y', `${y}px`);
                  }}
                >
                  <div className="text-2xl mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Automated Marketing</h3>
                  <p className="text-neutral-400">
                    Engage members with automated communications and targeted campaigns.
                  </p>
                </div>

                <div 
                  className="feature-box bg-neutral-900 p-8 rounded-xl border border-neutral-800 scroll-animation scroll-delay-3"
                  onMouseMove={(e) => {
                    const box = e.currentTarget;
                    const rect = box.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    box.style.setProperty('--x', `${x}px`);
                    box.style.setProperty('--y', `${y}px`);
                  }}
                >
                  <div className="text-2xl mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Analytics & Reporting</h3>
                  <p className="text-neutral-400">
                    Make data-driven decisions with comprehensive analytics and insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-32 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24 scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Gyms</h2>
              <p className="text-neutral-400">Everything you need to run your fitness business efficiently</p>
            </div>

            <div className="space-y-32 max-w-4xl mx-auto">
              {/* Feature 1 - Member Access */}
              <div className="grid md:grid-cols-2 gap-8 items-center scroll-animation">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4">Automated Member Access</h3>
                  <p className="text-neutral-400 mb-6">
                    Smart access control system that automatically manages member entry and tracks attendance. 
                    Our state-of-the-art system ensures seamless entry for valid members while maintaining 
                    security and gathering valuable attendance data.
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Contactless entry system</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Real-time attendance tracking</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Automated access restrictions</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 bg-neutral-900 w-[320px] h-[280px] hover:w-[340px] hover:h-[300px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-hidden group mx-auto transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-[-1px] rounded-xl bg-[#F86422] blur-lg opacity-30" />
                  </div>
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="bg-neutral-800 rounded-lg p-6 w-64 shadow-lg transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#F86422]/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <svg className="w-6 h-6 text-[#F86422]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-neutral-700 rounded-full w-3/4 mb-2 overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-transform duration-1000 group-hover:translate-x-0 -translate-x-full" />
                          </div>
                          <div className="text-sm text-neutral-400">Scanning...</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status</span>
                          <span className="text-green-400">Authorized</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Entry</span>
                          <span>2 mins ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Member Type</span>
                          <span className="text-[#F86422]">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Payments */}
              <div className="grid md:grid-cols-2 gap-8 items-center scroll-animation">
                <div className="bg-neutral-900 w-[340px] h-[420px] hover:w-[360px] hover:h-[440px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-hidden group mx-auto transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-[-1px] rounded-xl bg-[#F86422] blur-lg opacity-30" />
                  </div>
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="bg-neutral-800 rounded-lg p-6 w-64 shadow-lg transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm font-medium">Payment Status</div>
                        <div className="text-xs text-green-400">Processed</div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-3 bg-neutral-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 rounded bg-[#F86422]/20 group-hover:bg-[#F86422]/30 transition-colors duration-300" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">Monthly Membership</div>
                              <div className="text-xs text-neutral-400">Auto-renewal</div>
                            </div>
                            <div className="text-sm font-medium">$99.00</div>
                          </div>
                        </div>
                        <div className="h-px bg-neutral-700" />
                        <div className="flex items-center justify-between text-sm">
                          <span>Subtotal</span>
                          <span>$99.00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Tax</span>
                          <span>$8.91</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>Total</span>
                          <span className="text-[#F86422]">$107.91</span>
                        </div>
                        <div className="pt-4">
                          <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-green-400 to-green-500 transition-transform duration-1000 group-hover:translate-x-0 -translate-x-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Integrated Payments</h3>
                  <p className="text-neutral-400 mb-6">
                    Process membership fees, class payments, and retail transactions seamlessly. 
                    Our integrated payment system handles everything from recurring memberships 
                    to one-time purchases with ease.
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Automated billing</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Multiple payment methods</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Secure transactions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature 3 - Performance */}
              <div className="grid md:grid-cols-2 gap-8 items-center scroll-animation">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-4">Performance Tracking</h3>
                  <p className="text-neutral-400 mb-6">
                    Monitor gym metrics, member progress, and business growth in real-time. 
                    Make data-driven decisions with comprehensive analytics and insights 
                    that help you optimize your operations.
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Real-time analytics</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Custom reports</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Growth insights</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 bg-neutral-900 w-[320px] h-[280px] hover:w-[380px] hover:h-[340px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-hidden group mx-auto transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-[-1px] rounded-xl bg-[#F86422] blur-lg opacity-30" />
                  </div>
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <div className="bg-neutral-800 rounded-lg p-4 w-64 shadow-lg transition-all duration-300 hover:w-80 hover:scale-105 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#F86422]/20 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#F86422]/30" />
                        <div>
                          <div className="text-sm font-medium">Active Members</div>
                          <div className="text-xs text-neutral-400">Last 30 days</div>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-[#F86422]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-3">
                        <div className="text-2xl font-bold group-hover:text-[#F86422] transition-colors duration-300">1,248</div>
                        <div className="text-sm text-green-400 flex items-center">
                          +12.3%
                          <svg className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-y-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 15l-6-6-6 6"/>
                          </svg>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover:from-[#F86422] group-hover:to-[#F86422]/80" />
                        </div>
                        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover:from-[#F86422] group-hover:to-[#F86422]/80" />
                        </div>
                        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover:from-[#F86422] group-hover:to-[#F86422]/80" />
                        </div>
                      </div>
                      <div className="mt-4 overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-[100px] opacity-0 group-hover:opacity-100">
                        <div className="pt-3 border-t border-neutral-700">
                          <div className="flex justify-between text-xs text-neutral-400 mb-2">
                            <span>New Members</span>
                            <span className="text-green-400">+48</span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-400 mb-2">
                            <span>Retention Rate</span>
                            <span className="text-[#F86422]">94%</span>
                          </div>
                          <div className="flex justify-between text-xs text-neutral-400">
                            <span>Avg. Daily Visits</span>
                            <span>186</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 - Mobile */}
              <div className="grid md:grid-cols-2 gap-8 items-center scroll-animation">
                <div className="bg-neutral-800 rounded-[32px] p-4 w-[280px] h-[560px] shadow-lg transition-all duration-300 hover:scale-105 group mx-auto">
                  <div className="bg-neutral-900 rounded-[24px] w-full h-full p-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-[-1px] rounded-[24px] bg-[#F86422] blur-lg opacity-30" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-sm font-medium">Welcome back</div>
                          <div className="text-xs text-neutral-400">Sarah</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#F86422]/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#F86422]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors">
                          <div className="text-sm font-medium mb-2">Today's Class</div>
                          <div className="text-xs text-neutral-400">HIIT Training - 6:00 PM</div>
                          <div className="mt-2 flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#F86422]/20" />
                            <div className="w-6 h-6 rounded-full bg-[#F86422]/20" />
                            <div className="w-6 h-6 rounded-full bg-[#F86422]/20" />
                            <div className="w-6 h-6 rounded-full bg-[#F86422]/20 flex items-center justify-center text-xs">
                              +3
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors">
                          <div className="text-sm font-medium mb-2">Workout Progress</div>
                          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover:from-[#F86422] group-hover:to-[#F86422]/80" />
                          </div>
                          <div className="mt-2 text-xs text-neutral-400">8 of 12 sessions completed</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors">
                            <div className="text-2xl font-bold text-[#F86422]">24</div>
                            <div className="text-xs text-neutral-400">Classes This Month</div>
                          </div>
                          <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors">
                            <div className="text-2xl font-bold text-[#F86422]">87%</div>
                            <div className="text-xs text-neutral-400">Attendance Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Mobile App Access</h3>
                  <p className="text-neutral-400 mb-6">
                    Give members the power to book classes, track workouts, and manage their 
                    membership on the go. Our mobile app keeps your gym in your members' pockets.
                  </p>
                  <ul className="space-y-3 text-neutral-300">
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Easy class booking</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Workout tracking</span>
                    </li>
                    <li 
                      className="flex items-center gap-2 feature-list-item"
                      onMouseMove={(e) => {
                        const item = e.currentTarget.querySelector('span');
                        if (item) {
                          const rect = item.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          item.style.setProperty('--x', `${x}px`);
                          item.style.setProperty('--y', `${y}px`);
                        }
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Digital membership card</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-neutral-400 mb-12">Select the perfect plan for your gym&apos;s needs</p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="col-span-1 flex">
                {/* Basic Plan */}
                <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Basic Plan</h3>
                    <div className="text-3xl font-bold mb-4">$99/mo</div>
                    <p className="text-neutral-400 mb-6">Perfect for Small Gyms</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Member Management
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Basic Scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Payment Processing
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Get Started</Button>
                </div>
              </div>
              <div className="col-span-1 flex">
                {/* Pro Plan */}
                <div className="bg-neutral-800 p-10 rounded-xl border-2 border-[#F86422]/20 relative flex flex-col flex-1 scale-105">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F86422]/90 text-white px-4 py-1.5 rounded-full text-xs font-medium">
                    Most Popular
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Pro Plan</h3>
                    <div className="text-2xl font-bold mb-1 text-white">$199/mo</div>
                    <div className="text-xs text-neutral-300 mb-4">Save 20% with annual billing</div>
                    <p className="text-sm text-neutral-300 mb-6">For Growing Fitness Centers</p>
                  </div>
                  <ul className="space-y-4 mb-8 text-sm text-neutral-200 flex-grow">
                    <li className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Everything in Basic
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Advanced Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Staff Management
                    </li>
                  </ul>
                  <Button className="w-full text-sm bg-[#F86422] hover:bg-[#F86422]/90 text-white">Get Started</Button>
                </div>
              </div>
              <div className="col-span-1 flex">
                {/* Enterprise Plan */}
                <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                    <div className="text-3xl font-bold mb-4">Custom</div>
                    <p className="text-neutral-400 mb-6">For Gym Chains & Franchises</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-1">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-1">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Custom Integrations</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">Contact Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-neutral-800/50 scroll-animation">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="text-sm text-neutral-400">
            © 2024 Gymers, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Discord</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6h0a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v0"/>
                <path d="M6 18v-7a3 3 0 0 1 3-3h7"/>
                <circle cx="8" cy="12" r="1"/>
                <circle cx="16" cy="12" r="1"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}