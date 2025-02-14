'use client'

export default function ReportsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Reports */}
        <div className="lg:col-span-2 bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">$24.8k</div>
              <div className="text-sm text-neutral-400">Revenue</div>
              <div className="text-xs text-green-400 mt-1">↑ 12.5%</div>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="text-2xl font-bold text-[#F86422]">$18.2k</div>
              <div className="text-sm text-neutral-400">Expenses</div>
              <div className="text-xs text-red-400 mt-1">↑ 5.2%</div>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">$6.6k</div>
              <div className="text-sm text-neutral-400">Profit</div>
              <div className="text-xs text-green-400 mt-1">↑ 8.3%</div>
            </div>
          </div>
          
          {/* Monthly Breakdown */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium mb-4">Monthly Breakdown</h3>
            {[
              { category: 'Membership Fees', amount: '$15,425', percentage: '62%' },
              { category: 'Personal Training', amount: '$5,840', percentage: '23%' },
              { category: 'Class Fees', amount: '$2,450', percentage: '10%' },
              { category: 'Other Revenue', amount: '$1,085', percentage: '5%' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-neutral-700/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{item.category}</span>
                  <span className="text-sm">{item.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-neutral-800 rounded-full">
                    <div 
                      className="h-full bg-[#F86422] rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400">{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-6">
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
            <div className="space-y-3">
              {[
                {
                  name: 'Financial Summary',
                  description: 'Revenue, expenses, and profit analysis',
                  type: 'Monthly'
                },
                {
                  name: 'Member Analytics',
                  description: 'Membership growth and retention metrics',
                  type: 'Weekly'
                },
                {
                  name: 'Class Performance',
                  description: 'Attendance and popularity metrics',
                  type: 'Daily'
                },
                {
                  name: 'Equipment Usage',
                  description: 'Utilization and maintenance reports',
                  type: 'Weekly'
                }
              ].map((report, i) => (
                <div key={i} className="p-4 bg-neutral-700/30 rounded-lg group hover:bg-neutral-700/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-medium">{report.name}</h3>
                      <p className="text-xs text-neutral-400">{report.description}</p>
                    </div>
                    <span className="text-xs text-[#F86422] px-2 py-1 rounded-full bg-[#F86422]/10">
                      {report.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Export Options</h2>
            <div className="space-y-3">
              {[
                { format: 'PDF Report', icon: '📄' },
                { format: 'Excel Spreadsheet', icon: '📊' },
                { format: 'CSV Data', icon: '📑' }
              ].map((option, i) => (
                <button 
                  key={i}
                  className="w-full p-3 bg-neutral-700/30 rounded-lg flex items-center gap-3 hover:bg-neutral-700/50 transition-colors text-left"
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-sm">{option.format}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-[#F86422] text-white rounded-lg hover:bg-[#F86422]/90 transition-colors text-sm">
                Generate Monthly Report
              </button>
              <button className="w-full p-3 bg-neutral-700/30 rounded-lg hover:bg-neutral-700/50 transition-colors text-sm">
                Schedule Automated Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}