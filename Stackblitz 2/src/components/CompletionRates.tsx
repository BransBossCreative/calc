import React from 'react';
import { Target } from 'lucide-react';

export function CompletionRates() {
  const sectionRates = [
    { name: 'Accepted Offer', rate: 95, color: 'bg-green-500' },
    { name: 'Option Period', rate: 82, color: 'bg-blue-500' },
    { name: 'Pending', rate: 78, color: 'bg-purple-500' },
    { name: 'Final Week', rate: 89, color: 'bg-indigo-500' },
    { name: 'Closing', rate: 93, color: 'bg-emerald-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Section Completion Rates</h3>
        <Target className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {sectionRates.map((section) => (
          <div key={section.name} className="flex items-center">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">{section.name}</span>
                <span className="text-gray-900 font-semibold">{section.rate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${section.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${section.rate}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Average completion rate:</span> 87.4%
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Users typically complete most sections within 3-4 weeks
        </div>
      </div>
    </div>
  );
}