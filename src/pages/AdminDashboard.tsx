import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { StatsCard } from '../components/StatsCard';
import { Users, ClipboardCheck, TrendingUp, Globe } from 'lucide-react';
import { RecentActivity } from '../components/RecentActivity';
import { ProgressChart } from '../components/ProgressChart';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Active Clients',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Deployed Checklists',
      value: '892',
      change: '+8%',
      changeType: 'positive' as const,
      icon: ClipboardCheck
    },
    {
      title: 'Completed Purchases',
      value: '355',
      change: '+23%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Active Subdomains',
      value: '892',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Globe
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage client checklists and subdomain deployments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              <Users className="h-5 w-5 mr-2" />
              Create New Client
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Manage Templates
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              <Globe className="h-5 w-5 mr-2" />
              View Deployments
            </button>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart />
          <RecentActivity />
        </div>

        {/* Recent Deployments */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Deployments</h3>
          <div className="space-y-3">
            {[
              { client: 'Sarah Johnson', subdomain: 'sarah-johnson', status: 'Active', deployed: '2 hours ago' },
              { client: 'Michael Chen', subdomain: 'michael-chen', status: 'Active', deployed: '4 hours ago' },
              { client: 'Emily Rodriguez', subdomain: 'emily-rodriguez', status: 'Active', deployed: '6 hours ago' },
              { client: 'David Smith', subdomain: 'david-smith', status: 'Inactive', deployed: '1 day ago' },
            ].map((deployment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{deployment.client}</div>
                    <div className="text-sm text-gray-500">{deployment.subdomain}.homebuyerchecklist.com</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    deployment.status === 'Active' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {deployment.status}
                  </div>
                  <div className="text-xs text-gray-400">{deployment.deployed}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}