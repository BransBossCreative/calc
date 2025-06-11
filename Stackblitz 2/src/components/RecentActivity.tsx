import React from 'react';
import { Clock, Globe, Users, Settings } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: 'Admin',
      action: 'deployed checklist for Sarah Johnson',
      property: 'sarah-johnson.homebuyerchecklist.com',
      time: '2 hours ago',
      icon: Globe
    },
    {
      id: 2,
      user: 'Admin',
      action: 'created new client',
      property: 'Michael Chen - 456 Pine Avenue',
      time: '4 hours ago',
      icon: Users
    },
    {
      id: 3,
      user: 'Sarah Johnson',
      action: 'completed option period section',
      property: '123 Oak Street',
      time: '6 hours ago',
      icon: Clock
    },
    {
      id: 4,
      user: 'Admin',
      action: 'updated checklist template',
      property: 'Closing section modifications',
      time: '8 hours ago',
      icon: Settings
    },
    {
      id: 5,
      user: 'Emily Rodriguez',
      action: 'added custom task',
      property: '789 Maple Drive',
      time: '10 hours ago',
      icon: Clock
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-500 truncate">{activity.property}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6">
        <button className="text-black hover:text-gray-800 text-sm font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
}