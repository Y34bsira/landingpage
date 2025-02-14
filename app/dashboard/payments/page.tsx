'use client'

export default function PaymentsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Overview */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">$24,856</div>
              <div className="text-sm text-neutral-400">Monthly Revenue</div>
              <div className="text-xs text-green-400 mt-1">↑ 12.3%</div>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg">
              <div className="text-2xl font-bold">847</div>
              <div className="text-sm text-neutral-400">Active Subscriptions</div>
              <div className="text-xs text-[#F86422] mt-1">↑ 8.5%</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-neutral-700/30 rounded-lg">
              <div className="text-sm">Monthly Recurring</div>
              <div className="text-sm text-green-400">$18,425</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-neutral-700/30 rounded-lg">
              <div className="text-sm">One-time Payments</div>
              <div className="text-sm text-green-400">$6,431</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[
              { name: 'John Smith', amount: '$99.00', type: 'Monthly Membership', status: 'Completed' },
              { name: 'Sarah Wilson', amount: '$150.00', type: 'Personal Training', status: 'Processing' },
              { name: 'Mike Johnson', amount: '$99.00', type: 'Monthly Membership', status: 'Failed' }
            ].map((transaction, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                <div>
                  <div className="text-sm font-medium">{transaction.name}</div>
                  <div className="text-xs text-neutral-400">{transaction.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{transaction.amount}</div>
                  <div className={`text-xs ${
                    transaction.status === 'Completed' ? 'text-green-400' : 
                    transaction.status === 'Processing' ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}>{transaction.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-neutral-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Premium Plan</span>
                <span className="text-xs text-[#F86422]">382 members</span>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>$99/month</span>
                <span>45% of total</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full mt-2">
                <div className="h-full w-[45%] bg-[#F86422] rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-neutral-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Standard Plan</span>
                <span className="text-xs text-green-400">465 members</span>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>$49/month</span>
                <span>55% of total</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full mt-2">
                <div className="h-full w-[55%] bg-green-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-3">
            <div className="p-4 bg-neutral-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Credit Cards</span>
                <span className="text-xs text-green-400">72%</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full">
                <div className="h-full w-[72%] bg-green-400 rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-neutral-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Bank Transfer</span>
                <span className="text-xs text-[#F86422]">18%</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full">
                <div className="h-full w-[18%] bg-[#F86422] rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-neutral-700/30 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Digital Wallets</span>
                <span className="text-xs text-blue-400">10%</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full">
                <div className="h-full w-[10%] bg-blue-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}