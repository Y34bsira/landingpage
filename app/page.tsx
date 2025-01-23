'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'prod_RdUvhILpCB6wuf' // Replace with your actual price ID
      }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground">
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
            <h2 className="text-6xl md:text-8xl font-bold mb-8">
              Power Your Gym&apos;s Success Story
            </h2>
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
                        {/* X-axis labels */}
                        <div className="relative mt-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                            <div key={i} className="absolute text-[10px] text-neutral-400" style={{
                              left: `${(i * 14.25) + 8.5}%`,
                              transform: 'translateX(-50%)'
                            }}>{month}</div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                          <div className="bg-neutral-700/30 p-2 rounded-lg">
                            <div className="text-xs text-neutral-400">Member Growth</div>
                            <div className="text-sm font-medium text-[#F86422]">+24.5%</div>
                          </div>
                          <div className="bg-neutral-700/30 p-2 rounded-lg">
                            <div className="text-xs text-neutral-400">Revenue Growth</div>
                            <div className="text-sm font-medium text-green-400">+32.8%</div>
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
                <div className="order-1 md:order-2 bg-neutral-900 w-[320px] h-[280px] hover:w-[340px] hover:h-[300px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-visible group mx-auto transition-all duration-300">
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
                <div className="bg-neutral-900 w-[340px] h-[420px] hover:w-[360px] hover:h-[440px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-visible group mx-auto transition-all duration-300">
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
                <div className="order-1 md:order-2 bg-neutral-900 w-[320px] h-[280px] hover:w-[380px] hover:h-[340px] rounded-xl border border-neutral-800 hover:border-[#F86422]/70 p-6 relative overflow-visible group mx-auto transition-all duration-300">
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
                  <div className="bg-neutral-900 rounded-[24px] w-full h-full p-4 relative overflow-visible">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-[-1px] rounded-[24px] bg-[#F86422] blur-lg opacity-30" />
                    </div>
                    <div className="relative z-10">
                      <div className="space-y-6">
                        {/* Digital Membership Card - Appears on Hover */}
                        <div className="relative overflow-visible">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-24 transition-all duration-500 ease-out z-50">
                            <div 
                              className="bg-neutral-800 p-4 rounded-xl shadow-lg border border-neutral-700 transform group-hover:scale-110 transition-all duration-500 relative group/card overflow-hidden"
                              onMouseMove={(e) => {
                                const card = e.currentTarget;
                                const rect = card.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                card.style.setProperty('--mouse-x', `${x}px`);
                                card.style.setProperty('--mouse-y', `${y}px`);
                              }}
                            >
                              {/* Glow Effect */}
                              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 rounded-xl bg-[#F86422] opacity-30 blur-lg"
                                  style={{
                                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(248, 100, 34, 0.15), transparent 40%)`
                                  }}
                                />
                              </div>
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <div className="text-sm font-medium">Digital Membership</div>
                                    <div className="text-xs text-neutral-400">Premium Access</div>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-[#F86422]/20 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-[#F86422]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <rect x="3" y="5" width="18" height="14" rx="2"/>
                                      <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs text-neutral-400">Member ID</span>
                                      <span className="text-xs font-medium">GYM-2024-1234</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs text-neutral-400">Status</span>
                                      <span className="text-xs text-green-400">Active</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs text-neutral-400">Valid Until</span>
                                      <span className="text-xs font-medium">Jan 2025</span>
                                    </div>
                                  </div>
                                  <div className="w-24 h-24 bg-white p-2 rounded-lg flex items-center justify-center">
                                    <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                                      <path fill="currentColor" d="M0 0h40v40H0zm50 0h40v40H50zM0 50h40v40H0zm60 60h10V90H60zm20-20h10V70H80zM50 60h10V50H50zm20 0h10V50H70zm-20 20h10V70H50zm20 0h10V70H70zm-20 20h10V90H50z"/>
                                    </svg>
                                  </div>
                                </div>
                                {/* Additional Details - Show on Card Hover */}
                                <div className="mt-3 overflow-hidden transition-all duration-300 max-h-0 group-hover/card:max-h-[80px] opacity-0 group-hover/card:opacity-100">
                                  <div className="pt-3 border-t border-neutral-700 space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-neutral-400">Last Check-in</span>
                                      <span>Today, 9:30 AM</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-neutral-400">Monthly Visits</span>
                                      <span className="text-[#F86422]">24/30</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                      <span className="text-neutral-400">Membership Level</span>
                                      <span className="text-[#F86422]">Elite</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 h-2 bg-neutral-700 rounded-full overflow-hidden">
                                  <div className="h-full w-full bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover/card:from-[#F86422] group-hover/card:to-[#F86422]/80" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Today's Class */}
                        <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors mb-4">
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

                        {/* Workout Progress */}
                        <div className="p-4 bg-neutral-800 rounded-xl group-hover:bg-neutral-800/80 transition-colors mb-4">
                          <div className="text-sm font-medium mb-2">Workout Progress</div>
                          <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-[#F86422] to-[#F86422]/60 transition-all duration-300 group-hover:from-[#F86422] group-hover:to-[#F86422]/80" />
                          </div>
                          <div className="mt-2 text-xs text-neutral-400">8 of 12 sessions completed</div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
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

        {/* Gymers Suite Section */}
        <section className="py-32 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-24 scroll-animation">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Gym Management</h2>
              <p className="text-neutral-400">Streamline your gym operations with our comprehensive management suite. Track member activity, monitor performance, and grow your business.</p>
            </div>

            <div className="space-y-32 max-w-4xl mx-auto">
              {/* Gymers Suite Section */}
              <div className="grid md:grid-cols-2 gap-12 items-center scroll-animation">
                <div className="jsx-501315f001146c70 bg-neutral-900 rounded-xl p-6 relative overflow-hidden group transform transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-[-1px] rounded-xl bg-[#F86422] blur-lg opacity-30" />
                  </div>
                  <div className="relative z-10">
                    {/* CRM Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-lg font-semibold">Gymers Suite</div>
                        <div className="text-sm text-neutral-400">Dashboard Overview</div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F86422]/10 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#F86422] animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors group/stat">
                        <div className="text-2xl font-bold text-[#F86422] group-hover/stat:scale-105 transition-transform">847</div>
                        <div className="text-sm text-neutral-400">Active Members</div>
                      </div>
                      <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors group/stat">
                        <div className="text-2xl font-bold text-green-400 group-hover/stat:scale-105 transition-transform">92%</div>
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

                    {/* Revenue Graph */}
                    <div className="bg-neutral-800/50 p-4 rounded-lg mb-4 hover:bg-neutral-800/70 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium">Revenue Growth</div>
                        <div className="text-xs text-green-400">+24% MTD</div>
                      </div>
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
                            { month: 'Jan', revenue: 55 },
                            { month: 'Feb', revenue: 70 },
                            { month: 'Mar', revenue: 65 },
                            { month: 'Apr', revenue: 80 },
                            { month: 'May', revenue: 85 },
                            { month: 'Jun', revenue: 88 },
                            { month: 'Jul', revenue: 92 }
                          ].map((data, i) => (
                            <div key={i} className="absolute group/point" style={{ 
                              left: `${(i * 14.25) + 7}%`,
                              bottom: '0',
                              width: '20px',
                              height: '100%'
                            }}>
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
                                  <div className="text-xs text-green-400">Revenue: {data.revenue}%</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* X-axis labels */}
                      <div className="relative mt-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                          <div key={i} className="absolute text-[10px] text-neutral-400" style={{
                            left: `${(i * 14.25) + 8.5}%`,
                            transform: 'translateX(-50%)'
                          }}>{month}</div>
                        ))}
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
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Powerful Gym Management</h3>
                  <p className="text-neutral-400 mb-8">Streamline your gym operations with our comprehensive management suite. Track member activity, monitor performance, and grow your business.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2 feature-list-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Real-time analytics and insights</span>
                    </li>
                    <li className="flex items-center gap-2 feature-list-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Member activity tracking</span>
                    </li>
                    <li className="flex items-center gap-2 feature-list-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Automated reporting system</span>
                    </li>
                    <li className="flex items-center gap-2 feature-list-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      <span>Business performance metrics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-neutral-400">Select the perfect plan for your fitness journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {/* Basic Plan */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 relative group hover:border-[#F86422]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-8px_rgba(248,100,34,0.1)]"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Glow Effect */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(248, 100, 34, 0.1), transparent 40%)`
                  }}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
                <div className="text-3xl font-bold mb-6">$99<span className="text-lg font-normal text-neutral-400">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Member Management
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Basic Scheduling
                  </li>
                </ul>
                <button className="w-full py-2 rounded-lg bg-neutral-800 text-sm font-medium hover:bg-[#F86422]/90 transition-colors duration-300" onClick={handleCheckout}>Get Started</button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-[#F86422]/50 relative group hover:border-[#F86422] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-8px_rgba(248,100,34,0.15)]"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F86422]/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              {/* Glow Effect */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(248, 100, 34, 0.15), transparent 40%)`
                  }}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
                <div className="text-3xl font-bold mb-6">$199<span className="text-lg font-normal text-neutral-400">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Everything in Basic
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Advanced Analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Staff Management
                  </li>
                </ul>
                <button className="w-full py-2 rounded-lg bg-[#F86422] text-sm font-medium hover:bg-[#F86422]/90 transition-colors duration-300 transform group-hover:scale-105" onClick={handleCheckout}>Get Started</button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 relative group hover:border-[#F86422]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-8px_rgba(248,100,34,0.1)]"
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
              }}
            >
              {/* Glow Effect */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(248, 100, 34, 0.1), transparent 40%)`
                  }}
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-4">Enterprise Plan</h3>
                <div className="text-3xl font-bold mb-6">Custom</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#F86422] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Custom Integrations
                  </li>
                </ul>
                <button 
                  onClick={() => window.open('https://calendly.com/gymersapp/30min', '_blank')}
                  className="w-full py-2 rounded-lg bg-neutral-800 text-sm font-medium hover:bg-[#F86422]/90 transition-colors duration-300"
                >
                  Contact Sales
                </button>
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