'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface Member {
  id: string
  name: string
  membershipId: string
  tier: 'Basic' | 'Premium' | 'Elite'
  personalTrainer: string | null
  lastCheckIn: string
  joinDate: string
  status: 'Active' | 'Inactive' | 'Suspended'
}

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // This would be replaced with actual data from your backend
  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      membershipId: 'GYM001',
      tier: 'Premium',
      personalTrainer: 'Sarah Smith',
      lastCheckIn: '2024-01-20T09:00:00',
      joinDate: '2023-06-15',
      status: 'Active'
    },
    // Add more sample data as needed
  ]

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Members</h1>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search members..."
            className="px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-800">
              <tr className="text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Membership ID</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Personal Trainer</th>
                <th className="p-4">Last Check-in</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id} className="border-b border-neutral-800">
                  <td className="p-4">{member.name}</td>
                  <td className="p-4">{member.membershipId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      member.tier === 'Elite' ? 'bg-purple-500/20 text-purple-300' :
                      member.tier === 'Premium' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-neutral-500/20 text-neutral-300'
                    }`}>
                      {member.tier}
                    </span>
                  </td>
                  <td className="p-4">{member.personalTrainer || '-'}</td>
                  <td className="p-4">{new Date(member.lastCheckIn).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      member.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                      member.status === 'Inactive' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {/* TODO: Implement view details */}}
                      className="text-sm text-[#F86422] hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}