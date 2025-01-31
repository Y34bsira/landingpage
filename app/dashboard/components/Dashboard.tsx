'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation' // Changed import

export default function Dashboard() {
  const router = useRouter(); // Initialize router
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

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing auth tokens
    // Example:
    // logout(); // Your logout function
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground overflow-x-hidden overflow-y-hidden">
      <header className="flex items-center justify-between py-4 px-6 border-b border-neutral-800/50">
        <Link href="/" className="text-lg font-semibold">
          Gymers
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Log out
          </Button>
          <Button size="sm" asChild>
            <a href="https://calendly.com/gymersapp/30min" target="_blank" rel="noopener noreferrer">Book a Demo</a>
          </Button>
          {/* If there are additional navigation items in page.tsx, add them here */}
        </nav>
      </header>
      
      {/* Global Styles */}
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

        .scroll-expand {
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }

        .scroll-expand.animate-in {
          transform: scale(1.1);
        }

        .scroll-expand.animate-out {
          transform: scale(1);
        }

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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          <div className="hero-glow" />
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            {/* Removed the specified text and button */}
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
                  <div className="bg-neutral-900 w-full md:w-1/3 p-6 border-r border-neutral-800">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-lg font-semibold">Gymers Suite</div>
                        <div className="text-sm text-neutral-400">Dashboard Overview</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#F86422]/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#F86422] animate-pulse" />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-800/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-[#F86422]">847</div>
                        <div className="text-sm text-neutral-400">Active Members</div>
                      </div>
                      <div className="bg-neutral-800/50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-400">92%</div>
                        <div className="text-sm text-neutral-400">Retention Rate</div>
                      </div>
                    </div>

                    {/* Activity Graph */}
                    <div className="bg-neutral-800/50 p-4 rounded-lg mb-4 hover:bg-neutral-800/70 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium">Member Activity</div>
                        <div className="text-xs text-[#F86422]">This Week</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-neutral-400 w-12">Mon</div>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[85%] bg-[#F86422] rounded-full transform origin-left transition-transform duration-1000 scale-x-0 group-hover:scale-x-100" />
                          </div>
                          <div className="text-xs">85%</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-neutral-400 w-12">Tue</div>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[75%] bg-[#F86422] rounded-full transform origin-left transition-transform duration-1000 scale-x-0 group-hover:scale-x-100" style={{ transitionDelay: '200ms' }} />
                          </div>
                          <div className="text-xs">75%</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-neutral-400 w-12">Wed</div>
                          <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[90%] bg-[#F86422] rounded-full transform origin-left transition-transform duration-1000 scale-x-0 group-hover:scale-x-100" style={{ transitionDelay: '400ms' }} />
                          </div>
                          <div className="text-xs">90%</div>
                        </div>
                      </div>
                    </div>

                    {/* Membership Distribution */}
                    <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium">Membership Types</div>
                        <div className="text-xs text-[#F86422]">Distribution</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Premium</span>
                            <span className="text-[#F86422]">45%</span>
                          </div>
                          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[45%] bg-[#F86422] rounded-full transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100" />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Standard</span>
                            <span className="text-green-400">35%</span>
                          </div>
                          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[35%] bg-green-400 rounded-full transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100" style={{ transitionDelay: '200ms' }} />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Basic</span>
                            <span className="text-blue-400">20%</span>
                          </div>
                          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-[20%] bg-blue-400 rounded-full transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100" style={{ transitionDelay: '400ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Recent Activity */}
                      <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors group/activity">
                        <div className="text-sm font-medium mb-4 flex justify-between items-center">
                          <span>Recent Activity</span>
                          <span className="text-xs text-[#F86422] opacity-0 group-hover/activity:opacity-100 transition-opacity">Live</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 hover:bg-neutral-700/30 p-2 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <div className="flex-1">
                              <div className="text-xs">New member registration</div>
                              <div className="text-xs text-neutral-400">2 mins ago</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 hover:bg-neutral-700/30 p-2 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-[#F86422]" />
                            <div className="flex-1">
                              <div className="text-xs">Class booking - HIIT</div>
                              <div className="text-xs text-neutral-400">15 mins ago</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 hover:bg-neutral-700/30 p-2 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <div className="flex-1">
                              <div className="text-xs">Payment processed</div>
                              <div className="text-xs text-neutral-400">1 hour ago</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Upcoming Meetings */}
                      <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors group/meetings">
                        <div className="text-sm font-medium mb-4">Upcoming Meetings</div>
                        <div className="space-y-3">
                          <div className="p-3 bg-neutral-700/30 rounded-lg group-hover/meetings:translate-x-1 transition-transform">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium">New Member Orientation</span>
                              <span className="text-xs text-[#F86422]">Today</span>
                            </div>
                            <div className="text-xs text-neutral-400">2:00 PM - 3:00 PM</div>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#F86422]/20 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-[#F86422]" />
                              </div>
                              <span className="text-xs">3 Attendees</span>
                            </div>
                          </div>
                          <div className="p-3 bg-neutral-700/30 rounded-lg group-hover/meetings:translate-x-1 transition-transform" style={{ transitionDelay: '100ms' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium">Staff Training</span>
                              <span className="text-xs text-green-400">Tomorrow</span>
                            </div>
                            <div className="text-xs text-neutral-400">10:00 AM - 11:30 AM</div>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                              </div>
                              <span className="text-xs">5 Attendees</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Growth */}
                      <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors col-span-2 group/growth">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-sm font-medium">Monthly Growth</div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#F86422]" />
                              <span className="text-xs text-neutral-400">Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                              <span className="text-xs text-neutral-400">Revenue</span>
                            </div>
                          </div>
                        </div>
                        {/* Monthly Growth Graph */}
                        <div className="relative h-[160px]">
                          {/* Grid lines */}
                          <div className="absolute inset-0 z-0">
                            <div className="h-full flex flex-col justify-between">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="border-t border-neutral-700/50 w-full h-0" />
                              ))}
                            </div>
                          </div>
                          
                          {/* Y-axis labels */}
                          <div className="absolute left-0 top-0 h-full flex flex-col justify-between pr-2 z-10">
                            <span className="text-[10px] text-neutral-400">100%</span>
                            <span className="text-[10px] text-neutral-400">75%</span>
                            <span className="text-[10px] text-neutral-400">50%</span>
                            <span className="text-[10px] text-neutral-400">25%</span>
                            <span className="text-[10px] text-neutral-400">0%</span>
                          </div>

                          {/* Data Points */}
                          <div className="absolute inset-0 ml-6 z-20">
                            {[
                              { month: 'Jan', members: 65, revenue: 55 },
                              { month: 'Feb', members: 75, revenue: 70 },
                              { month: 'Mar', members: 60, revenue: 65 },
                              { month: 'Apr', members: 85, revenue: 80 },
                              { month: 'May', members: 75, revenue: 85 },
                              { month: 'Jun', members: 90, revenue: 88 },
                              { month: 'Jul', members: 85, revenue: 92 }
                            ].map((data, i) => (
                              <div key={i} className="absolute group/point" style={{ 
                                left: `${(i * 14.25) + 7}%`,
                                bottom: '0',
                                width: '20px',
                                height: '100%'
                              }}>
                                {/* Member point */}
                                <div 
                                  className="absolute w-2 h-2 bg-[#F86422] rounded-full -translate-x-1/2 hover:scale-150 transition-transform duration-200"
                                  style={{ 
                                    bottom: `${data.members}%`,
                                    left: '50%'
                                  }}
                                />
                                {/* Revenue point */}
                                <div 
                                  className="absolute w-2 h-2 bg-green-400 rounded-full -translate-x-1/2 hover:scale-150 transition-transform duration-200"
                                  style={{ 
                                    bottom: `${data.revenue}%`,
                                    left: '50%'
                                  }}
                                />
                                {/* Combined hover card */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/point:opacity-100 transition-opacity duration-200 pointer-events-none">
                                  <div className="bg-neutral-800 rounded-lg p-2 shadow-lg border border-neutral-700 whitespace-nowrap">
                                    <div className="text-xs font-medium">{data.month}</div>
                                    <div className="text-xs text-[#F86422]">Members: {data.members}%</div>
                                    <div className="text-xs text-green-400">Revenue: {data.revenue}%</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Removed Sections */}
        {/* Transform Your Gym's Operations */}
        {/* Powerful Features for Modern Gyms */}
        {/* Powerful Gym Management */}
        {/* Choose Your Plan */}
      </main>

      <footer className="py-8 px-6 border-t border-neutral-800/50">
        {/* ...existing footer content... */}
      </footer>
    </div>
  )
}