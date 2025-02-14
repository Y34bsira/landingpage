'use client'

import React, { useRef, useEffect } from 'react'

export default function Dashboard() {
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

  // Mock data for monthly growth
  const monthlyData = [
    { month: 'Jan', members: 65, revenue: 55 },
    { month: 'Feb', members: 75, revenue: 70 },
    { month: 'Mar', members: 60, revenue: 65 },
    { month: 'Apr', members: 85, revenue: 80 },
    { month: 'May', members: 75, revenue: 85 },
    { month: 'Jun', members: 90, revenue: 88 },
    { month: 'Jul', members: 85, revenue: 92 }
  ];

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Member Access Card */}
        <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Member Access</div>
            <div className="text-xs text-green-400">Active</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F86422]/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-neutral-400">Premium Member</div>
                </div>
              </div>
              <div className="text-xs text-green-400">Authorized</div>
            </div>
            <div className="h-px bg-neutral-700/50" />
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Last Entry</span>
                <span>2 mins ago</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Member Type</span>
                <span>Premium</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Access Level</span>
                <span className="text-[#F86422]">All Areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status Card */}
        <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Payment Status</div>
            <div className="text-xs text-green-400">Processed</div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-neutral-700/30 rounded-lg">
              <div className="text-sm font-medium mb-2">Monthly Membership</div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Auto-renewal
              </div>
            </div>
            <div className="h-px bg-neutral-700" />
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Tax</span>
                <span>$8.91</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-neutral-400">Total</span>
                <span>$107.91</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Performance Metrics</div>
            <div className="text-xs text-[#F86422]">Last 30 days</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-[#F86422]">1,248</div>
              <div className="text-xs text-green-400 flex items-center pb-1">
                +12.3%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-neutral-400">Classes This Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">87%</div>
                <div className="text-xs text-neutral-400">Attendance Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Membership */}
        <div className="bg-neutral-800/50 p-4 rounded-lg hover:bg-neutral-800/70 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Digital Membership</div>
            <div className="text-xs text-green-400">Premium Access</div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Member ID</span>
                <span>GYM-2024-1234</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Valid Until</span>
                <span>Jan 2025</span>
              </div>
            </div>
            <div className="h-px bg-neutral-700" />
            <div>
              <div className="text-xs mb-2">Today's Class</div>
              <div className="flex items-center justify-between">
                <div className="text-sm">HIIT Training - 6:00 PM</div>
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-neutral-800" />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-neutral-800 flex items-center justify-center">
                    <span className="text-xs">+3</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs mb-2">Workout Progress</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[66%] bg-[#F86422] rounded-full" />
                </div>
                <div className="text-xs">8 of 12 sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Growth Section */}
      <div className="mt-6 bg-neutral-800/50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
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
        
        <div className="relative h-[200px]">
          {/* Grid lines */}
          <div className="absolute inset-0">
            <div className="h-full flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t border-neutral-700/50 w-full h-0" />
              ))}
            </div>
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between pr-2">
            <span className="text-[10px] text-neutral-400">100%</span>
            <span className="text-[10px] text-neutral-400">75%</span>
            <span className="text-[10px] text-neutral-400">50%</span>
            <span className="text-[10px] text-neutral-400">25%</span>
            <span className="text-[10px] text-neutral-400">0%</span>
          </div>

          {/* Data Points */}
          <div className="absolute inset-0 ml-6">
            {monthlyData.map((data, i) => (
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
                {/* Hover tooltip */}
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
        <div className="mt-2 flex justify-between px-6">
          {monthlyData.map((data) => (
            <div key={data.month} className="text-[10px] text-neutral-400">{data.month}</div>
          ))}
        </div>
      </div>
    </div>
  );
}