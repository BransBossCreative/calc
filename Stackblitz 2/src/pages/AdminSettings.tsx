import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Save, Bell, Shield, Database, Mail } from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Homebuyer\'s Checklist Pro',
    supportEmail: 'support@homebuyerchecklist.com',
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    autoBackup: true,
    dataRetentionDays: 365,
    maxUsersPerDay: 1000
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure application settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Users Per Day
                </label>
                <input
                  type="number"
                  value={settings.maxUsersPerDay}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxUsersPerDay: parseInt(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Enable Notifications</label>
                  <p className="text-sm text-gray-500">Send email notifications to users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, enableNotifications: e.target.checked }))}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Analytics Tracking</label>
                  <p className="text-sm text-gray-500">Track user behavior and usage</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableAnalytics}
                  onChange={(e) => setSettings(prev => ({ ...prev, enableAnalytics: e.target.checked }))}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Maintenance Mode</label>
                  <p className="text-sm text-gray-500">Temporarily disable public access</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Database className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Retention (Days)
                </label>
                <input
                  type="number"
                  value={settings.dataRetentionDays}
                  onChange={(e) => setSettings(prev => ({ ...prev, dataRetentionDays: parseInt(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
                <p className="text-sm text-gray-500 mt-1">
                  How long to keep user data before automatic deletion
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Auto Backup</label>
                  <p className="text-sm text-gray-500">Automatically backup data daily</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoBackup: e.target.checked }))}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="pt-4 border-t border-gray-200">
                <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                  Export All Data
                </button>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Server
                </label>
                <input
                  type="text"
                  placeholder="smtp.example.com"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="number"
                  placeholder="587"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username@example.com"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <button className="text-black hover:text-gray-800 font-medium text-sm">
                Test Email Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}