import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, User, Mail } from 'lucide-react';
import { useChecklist } from '../context/ChecklistContext';
import { useAuth } from '../context/AuthContext';
import { ChecklistSection } from '../components/ChecklistSection';
import { ProgressBar } from '../components/ProgressBar';
import { CountdownTimer } from '../components/CountdownTimer';
import { CelebrationModal } from '../components/CelebrationModal';
import { ContactManager } from '../components/ContactManager';
import { PropertyInfoForm } from '../components/PropertyInfoForm';
import { GeneralNotes } from '../components/GeneralNotes';
import { ExportButton } from '../components/ExportButton';
import { checklistData } from '../data/checklistData';
import { SectionId } from '../types';

export function ChecklistPage() {
  const { calculateOverallProgress, resetData } = useChecklist();
  const { loginAsUser } = useAuth();
  const [activeTab, setActiveTab] = useState<SectionId>('accepted-offer');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState({ title: '', message: '' });
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '' });

  const overallProgress = calculateOverallProgress();

  const handleCelebration = (title: string, message: string) => {
    setCelebrationData({ title, message });
    setShowCelebration(true);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userForm.name && userForm.email) {
      loginAsUser({
        id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email
      });
      setShowUserModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-600 hover:text-black mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center">
                <Home className="h-6 w-6 text-black mr-2" />
                <h1 className="text-xl font-display font-bold text-gray-900">
                  Homebuyer's Checklist
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUserModal(true)}
                className="flex items-center text-gray-600 hover:text-black"
              >
                <User className="h-5 w-5 mr-1" />
                Identify Yourself
              </button>
              <ExportButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Progress Header */}
          <div className="bg-black p-6 text-white">
            <h2 className="text-2xl font-display font-bold mb-2">Your Home Buying Progress</h2>
            <p className="text-gray-300 mb-4">Track your journey to homeownership</p>
            
            <ProgressBar
              percentage={overallProgress.percentage}
              label="Overall Progress"
              size="lg"
              className="text-white"
            />
          </div>

          {/* Property Info */}
          <PropertyInfoForm />

          {/* Contact Manager */}
          <ContactManager />

          {/* Tabs */}
          <div className="border-b bg-white">
            <div className="flex overflow-x-auto">
              {Object.entries(checklistData).map(([sectionId, section]) => (
                <button
                  key={sectionId}
                  onClick={() => setActiveTab(sectionId as SectionId)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === sectionId
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Section */}
          <ChecklistSection
            sectionId={activeTab}
            onCelebration={handleCelebration}
          />

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* General Notes */}
          <GeneralNotes />

          {/* Footer Actions */}
          <div className="p-6 border-t flex justify-between items-center bg-gray-50">
            <div className="text-sm text-gray-600">
              {overallProgress.completed} of {overallProgress.total} tasks completed
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                  resetData();
                }
              }}
              className="text-red-600 hover:text-red-700 font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-display font-semibold mb-4">Tell us about yourself</h3>
            <p className="text-gray-600 mb-6">
              This helps us track your progress and provide personalized insights.
            </p>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title={celebrationData.title}
        message={celebrationData.message}
      />
    </div>
  );
}