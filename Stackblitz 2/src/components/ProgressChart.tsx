import React from 'react';
import { TrendingUp } from 'lucide-react';

export function ProgressChart() {
  // Mock data for the chart
  const data = [
    { month: 'Jan', users: 45, completed: 38 },
    { month: 'Feb', users: 62, completed: 48 },
    { month: 'Mar', users: 78, completed: 65 },
    { month: 'Apr', users: 95, completed: 78 },
    { month: 'May', users: 115, completed: 89 },
    { month: 'Jun', users: 142, completed: 118 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.users, d.completed)));

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">User Progress Trends</h3>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.month} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-gray-600 font-medium">{item.month}</div>
            <div className="flex-1">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Started</span>
                    <span>{item.users}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(item.users / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Completed</span>
                    <span>{item.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(item.completed / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Started Checklists</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Completed Checklists</span>
        </div>
      </div>
    </div>
  );
}