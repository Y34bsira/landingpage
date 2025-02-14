'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { useParams } from 'next/navigation'

interface CheckIn {
  id: string
  timestamp: string
  location: string
}

interface Payment {
  id: string
  date: string
  amount: number
  status: 'Completed' | 'Pending' | 'Failed'
  description: string
}

interface ClassAttendance {
  id: string
  className: string
  date: string
  instructor: string
  status: 'Attended' | 'Missed' | 'Cancelled'
}

export default function MemberDetailsPage() {
  const params = useParams() || {}
  const [activeTab, setActiveTab] = useState<'profile' | 'checkins' | 'payments' | 'classes'>('profile')

  // This would be replaced with actual data from your backend
  const memberData = {
    id: params.id,
    name: 'John Doe',
    membershipId: 'GYM001',
    tier: 'Premium',
    personalTrainer: 'Sarah Smith',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2023-06-15',
    status: 'Active',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    checkIns: [
      { id: '1', timestamp: '2024-01-20T09:00:00', location: 'Main Entrance' },
      { id: '2', timestamp: '2024-01-18T16:30:00', location: 'Main Entrance' },
    ] as CheckIn[],
    payments: [
      { 
        id: '1', 
        date: '2024-01-01', 
        amount: 99.99, 
        status: 'Completed',
        description: 'Monthly Premium Membership'
      },
      { 
        id: '2', 
        date: '2023-12-01', 
        amount: 99.99, 
        status: 'Completed',
        description: 'Monthly Premium Membership'
      },
    ] as Payment[],
    classAttendance: [
      {
        id: '1',
        className: 'HIIT Training',
        date: '2024-01-19T10:00:00',
        instructor: 'Mike Johnson',
        status: 'Attended'
      },
      {
        id: '2',
        className: 'Yoga Basics',
        date: '2024-01-17T15:00:00',
        instructor: 'Lisa Chen',
        status: 'Attended'
      },
    ] as ClassAttendance[]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Member Details</h1>
        <span className={`px-3 py-1 rounded-full text-sm ${
          memberData.status === 'Active' ? 'bg-green-500/20 text-green-300' :
          memberData.status === 'Inactive' ? 'bg-yellow-500/20 text-yellow-300' :
          'bg-red-500/20 text-red-300'
        }`}>
          {memberData.status}
        </span>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 p-6">
        <div className="flex gap-4 border-b border-neutral-800">
          {(['profile', 'checkins', 'payments', 'classes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 -mb-px ${
                activeTab === tab
                  ? 'border-b-2 border-[#F86422] text-[#F86422]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="text-neutral-400">Name:</span> {memberData.name}</p>
                  <p><span className="text-neutral-400">Membership ID:</span> {memberData.membershipId}</p>
                  <p><span className="text-neutral-400">Email:</span> {memberData.email}</p>
                  <p><span className="text-neutral-400">Phone:</span> {memberData.phone}</p>
                  <p><span className="text-neutral-400">Join Date:</span> {memberData.joinDate}</p>
                  <p><span className="text-neutral-400">Membership Tier:</span> {memberData.tier}</p>
                  <p><span className="text-neutral-400">Personal Trainer:</span> {memberData.personalTrainer}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="space-y-2">
                  <p><span className="text-neutral-400">Name:</span> {memberData.emergencyContact.name}</p>
                  <p><span className="text-neutral-400">Relationship:</span> {memberData.emergencyContact.relationship}</p>
                  <p><span className="text-neutral-400">Phone:</span> {memberData.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checkins' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Check-in History</h3>
              <table className="w-full">
                <thead className="text-left border-b border-neutral-800">
                  <tr>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.checkIns.map(checkin => (
                    <tr key={checkin.id} className="border-b border-neutral-800">
                      <td className="p-3">{new Date(checkin.timestamp).toLocaleString()}</td>
                      <td className="p-3">{checkin.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment History</h3>
              <table className="w-full">
                <thead className="text-left border-b border-neutral-800">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.payments.map(payment => (
                    <tr key={payment.id} className="border-b border-neutral-800">
                      <td className="p-3">{payment.date}</td>
                      <td className="p-3">{payment.description}</td>
                      <td className="p-3">${payment.amount.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          payment.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                          payment.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Class Attendance</h3>
              <table className="w-full">
                <thead className="text-left border-b border-neutral-800">
                  <tr>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Instructor</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.classAttendance.map(attendance => (
                    <tr key={attendance.id} className="border-b border-neutral-800">
                      <td className="p-3">{new Date(attendance.date).toLocaleString()}</td>
                      <td className="p-3">{attendance.className}</td>
                      <td className="p-3">{attendance.instructor}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          attendance.status === 'Attended' ? 'bg-green-500/20 text-green-300' :
                          attendance.status === 'Missed' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {attendance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}