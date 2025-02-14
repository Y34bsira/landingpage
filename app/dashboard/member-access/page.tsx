'use client'

export default function MemberAccessPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Access Control */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Access Control</h2>
          <div className="space-y-4">
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Main Entrance</span>
                <span className="text-xs text-green-400">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-neutral-400">Last entry 2 mins ago</span>
              </div>
            </div>
            
            {/* Access Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-neutral-400">Check-ins Today</div>
              </div>
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-neutral-400">Valid Entries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Access Logs */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Access Logs</h2>
          <div className="space-y-3">
            {[
              { name: 'John Smith', time: '2 mins ago', status: 'Authorized' },
              { name: 'Sarah Wilson', time: '15 mins ago', status: 'Authorized' },
              { name: 'Mike Johnson', time: '1 hour ago', status: 'Expired' }
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium">{log.name}</div>
                  <div className="text-xs text-neutral-400">{log.time}</div>
                </div>
                <div className={`text-xs ${log.status === 'Authorized' ? 'text-green-400' : 'text-red-400'}`}>
                  {log.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Rules */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Access Rules</h2>
          <div className="space-y-3">
            {[
              { area: 'Gym Floor', hours: '24/7', level: 'All Members' },
              { area: 'Pool', hours: '6 AM - 10 PM', level: 'Premium' },
              { area: 'Spa', hours: '9 AM - 8 PM', level: 'Premium' }
            ].map((rule, i) => (
              <div key={i} className="p-3 bg-neutral-700/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{rule.area}</span>
                  <span className="text-xs text-[#F86422]">{rule.level}</span>
                </div>
                <div className="text-xs text-neutral-400">Operating Hours: {rule.hours}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Cards */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Digital Access Cards</h2>
          <div className="bg-neutral-700/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Active Cards</span>
              <span className="text-xs text-green-400">847 Cards</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-400">Premium Cards</span>
                <span className="text-xs">382</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-400">Standard Cards</span>
                <span className="text-xs">465</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full mt-2">
                <div className="h-full w-[45%] bg-[#F86422] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}