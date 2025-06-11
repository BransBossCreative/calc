import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { StatsCard } from '../components/StatsCard';
import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { CompletionRates } from '../components/CompletionRates';

export function AdminAnalytics() {
  const analyticsStats = [
    {
      title: 'Avg. Completion Time',
      value: '28 days',
      change: '-3 days',
      changeType: 'positive' as const,
      icon: Clock
    },
    {
      title: 'User Engagement',
      value: '87%',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: '+5%',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Monthly Growth',
      value: '23%',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Detailed insights into user behavior and checklist performance</p>
        </div>

        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart />
          <CompletionRates />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Most Popular Sections */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Sections</h3>
            <div className="space-y-4">
              {[
                { name: 'Accepted Offer', percentage: 95, color: 'bg-green-500' },
                { name: 'Pending', percentage: 87, color: 'bg-blue-500' },
                { name: 'Final Week', percentage: 78, color: 'bg-purple-500' },
                { name: 'Closing', percentage: 72, color: 'bg-indigo-500' },
                { name: 'Option Period', percentage: 65, color: 'bg-yellow-500' }
              ].map((section) => (
                <div key={section.name} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{section.name}</span>
                      <span className="text-gray-500">{section.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${section.color} h-2 rounded-full`}
                        style={{ width: `${section.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Feedback */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Satisfaction</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-gray-500 mb-4">Average Rating</div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center text-sm">
                    <span className="w-8 text-gray-600">{stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ 
                          width: `${stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0}%` 
                        }}
                      />
                    </div>
                    <span className="w-8 text-gray-500">
                      {stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '2%' : stars === 2 ? '1%' : '0%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Features */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Features</h3>
            <div className="space-y-3">
              {[
                { feature: 'Progress Tracking', usage: '98%' },
                { feature: 'Countdown Timer', usage: '94%' },
                { feature: 'Contact Manager', usage: '89%' },
                { feature: 'Custom Tasks', usage: '76%' },
                { feature: 'Export Feature', usage: '67%' },
                { feature: 'Notes Section', usage: '58%' }
              ].map((item) => (
                <div key={item.feature} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.feature}</span>
                  <span className="text-sm font-medium text-gray-900">{item.usage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}