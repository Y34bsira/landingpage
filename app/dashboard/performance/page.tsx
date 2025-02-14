'use client'

import { useState } from 'react'

// Monthly growth data
const monthlyData = [
  { month: 'Jan', members: 65, revenue: 55 },
  { month: 'Feb', members: 75, revenue: 70 },
  { month: 'Mar', members: 60, revenue: 65 },
  { month: 'Apr', members: 85, revenue: 80 },
  { month: 'May', members: 75, revenue: 85 },
  { month: 'Jun', members: 90, revenue: 88 },
  { month: 'Jul', members: 85, revenue: 92 }
];

export default function PerformancePage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Monthly Growth Chart */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold">Monthly Growth</div>
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
                }}>
                  {/* Member percentage line */}
                  <div className="absolute bottom-0 w-1 bg-[#F86422] rounded-t-sm transition-all" 
                    style={{ height: `${data.members}%` }} />
                  
                  {/* Revenue percentage line */}
                  <div className="absolute bottom-0 w-1 bg-green-400 rounded-t-sm transition-all -ml-2" 
                    style={{ height: `${data.revenue}%` }} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Key Performance Indicators */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
            <div className="grid gap-4">
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-[#F86422]">92%</div>
                  <div className="text-xs text-green-400 pb-1">↑ 5%</div>
                </div>
                <div className="text-sm text-neutral-400">Member Retention Rate</div>
              </div>
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-green-400">85%</div>
                  <div className="text-xs text-green-400 pb-1">↑ 3%</div>
                </div>
                <div className="text-sm text-neutral-400">Class Attendance</div>
              </div>
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-blue-400">78%</div>
                  <div className="text-xs text-green-400 pb-1">↑ 8%</div>
                </div>
                <div className="text-sm text-neutral-400">Member Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Member Growth */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Member Growth</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-neutral-400">Total Members</div>
                </div>
                <div className="bg-neutral-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">+48</div>
                  <div className="text-sm text-neutral-400">New This Month</div>
                </div>
              </div>
              <div className="p-4 bg-neutral-700/30 rounded-lg">
                <div className="text-sm mb-2">Growth Rate</div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-neutral-800 rounded-full">
                    <div className="h-full w-[75%] bg-[#F86422] rounded-full" />
                  </div>
                  <span className="text-sm text-[#F86422]">75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Class Performance */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Class Performance</h2>
            <div className="space-y-3">
              {[
                { name: 'HIIT Training', attendance: '92%', trend: 'up' },
                { name: 'Yoga', attendance: '88%', trend: 'up' },
                { name: 'Spin Class', attendance: '85%', trend: 'down' },
                { name: 'CrossFit', attendance: '90%', trend: 'up' }
              ].map((cls, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                  <div className="text-sm">{cls.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cls.attendance}</span>
                    <span className={cls.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                      {cls.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Peak Hours</h2>
            <div className="space-y-2">
              {[
                { time: '6AM - 9AM', usage: '75%' },
                { time: '11AM - 2PM', usage: '45%' },
                { time: '5PM - 8PM', usage: '95%' },
                { time: '8PM - 11PM', usage: '60%' }
              ].map((period, i) => (
                <div key={i} className="p-3 bg-neutral-700/30 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{period.time}</span>
                    <span>{period.usage}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full">
                    <div 
                      className="h-full bg-[#F86422] rounded-full" 
                      style={{ width: period.usage }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Usage */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Equipment Usage</h2>
            <div className="space-y-3">
              {[
                { name: 'Treadmills', usage: '82%', status: 'Optimal' },
                { name: 'Weight Machines', usage: '75%', status: 'Maintenance Due' },
                { name: 'Free Weights', usage: '90%', status: 'Optimal' },
                { name: 'Cycling Machines', usage: '65%', status: 'Optimal' }
              ].map((equipment, i) => (
                <div key={i} className="p-3 bg-neutral-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{equipment.name}</span>
                    <span className={`text-xs ${
                      equipment.status === 'Optimal' ? 'text-green-400' : 'text-yellow-400'
                    }`}>{equipment.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full">
                      <div 
                        className="h-full bg-[#F86422] rounded-full" 
                        style={{ width: equipment.usage }}
                      />
                    </div>
                    <span className="text-xs">{equipment.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Analytics */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Revenue Analytics</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">$24.8k</div>
                  <div className="text-sm text-neutral-400">Monthly Revenue</div>
                </div>
                <div className="bg-neutral-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#F86422]">$292</div>
                  <div className="text-sm text-neutral-400">Avg per Member</div>
                </div>
              </div>
              <div className="p-4 bg-neutral-700/30 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Revenue Target</span>
                  <span>85% Achieved</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full">
                  <div className="h-full w-[85%] bg-green-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}