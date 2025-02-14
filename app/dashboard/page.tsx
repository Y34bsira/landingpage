'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface ActivityItem {
  id: string
  type: 'check-in' | 'class-attendance' | 'payment' | 'membership'
  member: {
    name: string
    id: string
  }
  timestamp: string
  details: string
}

export default function DashboardPage() {
  const [memberId, setMemberId] = useState('')
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'check-in',
      member: { name: 'John Doe', id: 'GYM001' },
      timestamp: new Date().toISOString(),
      details: 'Main Entrance'
    },
    {
      id: '2',
      type: 'class-attendance',
      member: { name: 'Jane Smith', id: 'GYM002' },
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      details: 'Attended HIIT Training'
    },
    {
      id: '3',
      type: 'payment',
      member: { name: 'Mike Johnson', id: 'GYM003' },
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
      details: 'Monthly membership payment - $99.99'
    }
  ])

  const handleCheckIn = () => {
    if (!memberId.trim()) return

    // In a real app, you would validate the member ID and get member details from your backend
    const mockMember = {
      name: 'Test Member',
      id: memberId
    }

    const newActivity: ActivityItem = {
      id: Date.now().toString(),
      type: 'check-in',
      member: mockMember,
      timestamp: new Date().toISOString(),
      details: 'Main Entrance'
    }

    setActivities(prev => [newActivity, ...prev])
    setMemberId('')
  }

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'check-in':
        return (
          <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        )
      case 'class-attendance':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-8 h-8 rounded-full bg-[#F86422]/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#F86422]">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-in System */}
        <div className="lg:col-span-1">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Member Check-in</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Member ID"
                  className="flex-1 px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckIn()}
                />
                <button
                  onClick={handleCheckIn}
                  className="px-4 py-2 bg-[#F86422] text-white rounded-md hover:bg-[#F86422]/90 transition-colors"
                >
                  Check In
                </button>
              </div>
              <div className="text-sm text-neutral-400">
                Scan member card or enter member ID
              </div>
            </div>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium truncate">
                        {activity.member.name}
                      </div>
                      <div className="text-xs text-neutral-400 whitespace-nowrap">
                        {formatTimestamp(activity.timestamp)}
                      </div>
                    </div>
                    <div className="text-sm text-neutral-400 mt-1">
                      {activity.details}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                      ID: {activity.member.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}