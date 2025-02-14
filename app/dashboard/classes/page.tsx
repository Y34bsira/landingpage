'use client'

export default function ClassesPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-neutral-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {[
              { 
                name: 'HIIT Training',
                time: '6:00 AM - 7:00 AM',
                instructor: 'Mike Johnson',
                capacity: '15/20',
                status: 'In Progress'
              },
              {
                name: 'Yoga Flow',
                time: '8:00 AM - 9:00 AM',
                instructor: 'Sarah Wilson',
                capacity: '12/15',
                status: 'Upcoming'
              },
              {
                name: 'Spinning',
                time: '10:00 AM - 11:00 AM',
                instructor: 'John Smith',
                capacity: '18/20',
                status: 'Upcoming'
              },
              {
                name: 'CrossFit',
                time: '5:00 PM - 6:00 PM',
                instructor: 'Alex Turner',
                capacity: '10/12',
                status: 'Upcoming'
              }
            ].map((cls, i) => (
              <div key={i} className="p-4 bg-neutral-700/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{cls.name}</h3>
                    <p className="text-sm text-neutral-400">{cls.time}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    cls.status === 'In Progress' 
                      ? 'bg-[#F86422]/20 text-[#F86422]' 
                      : 'bg-green-400/20 text-green-400'
                  }`}>
                    {cls.status}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center">
                      {cls.instructor[0]}
                    </div>
                    <span className="text-sm">{cls.instructor}</span>
                  </div>
                  <div className="text-sm text-neutral-400">{cls.capacity} spots</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Stats */}
        <div className="space-y-6">
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Class Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-neutral-400">Classes Today</div>
              </div>
              <div className="bg-neutral-700/30 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">92%</div>
                <div className="text-sm text-neutral-400">Attendance Rate</div>
              </div>
            </div>
          </div>

          {/* Popular Classes */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Popular Classes</h2>
            <div className="space-y-3">
              {[
                { name: 'HIIT Training', attendance: '95%' },
                { name: 'Yoga Flow', attendance: '88%' },
                { name: 'CrossFit', attendance: '85%' }
              ].map((cls, i) => (
                <div key={i} className="p-3 bg-neutral-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{cls.name}</span>
                    <span className="text-xs text-green-400">{cls.attendance}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full">
                    <div 
                      className="h-full bg-[#F86422] rounded-full" 
                      style={{ width: cls.attendance }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructors */}
          <div className="bg-neutral-800/50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Top Instructors</h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Wilson', rating: '4.9', classes: '24' },
                { name: 'Mike Johnson', rating: '4.8', classes: '18' },
                { name: 'John Smith', rating: '4.7', classes: '20' }
              ].map((instructor, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-neutral-700/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-neutral-600 flex items-center justify-center">
                    {instructor.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{instructor.name}</div>
                    <div className="text-xs text-neutral-400">{instructor.classes} classes this month</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F86422" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-sm">{instructor.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}