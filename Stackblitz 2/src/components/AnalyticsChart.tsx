import React from 'react';
import { BarChart3 } from 'lucide-react';

export function AnalyticsChart() {
  const weekData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 90 },
    { day: 'Thu', value: 81 },
    { day: 'Fri', value: 56 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 38 }
  ];

  const maxValue = Math.max(...weekData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="flex items-end justify-between h-40 space-x-2">
        {weekData.map((item) => (
          <div key={item.day} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col justify-end h-32">
              <div
                className="w-full bg-black rounded-t transition-all duration-300 hover:bg-gray-700"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">{item.day}</div>
            <div className="text-xs font-medium text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-medium">Peak day:</span> Wednesday with 90 active users
      </div>
    </div>
  );
}