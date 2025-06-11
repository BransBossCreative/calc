import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ClipboardCheck, Shield, TrendingUp, Users, Settings } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-black mr-3" />
              <h1 className="text-2xl font-display font-bold text-gray-900">
                Homebuyer's Checklist Pro
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/admin/login"
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-display font-bold text-gray-900 mb-6">
            Professional Home Buying Management Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive platform for real estate professionals to create and manage 
            personalized home buying checklists for their clients. Each client gets their 
            own dedicated subdomain with a customized checklist experience.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">For Real Estate Professionals</h3>
            <p className="text-blue-800">
              Contact your administrator to set up personalized checklists for your clients. 
              Each client will receive their own custom subdomain with a tailored home buying experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Professional-Grade Features
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for real estate professionals who want to provide exceptional service to their clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Client Management</h4>
              <p className="text-gray-600">
                Create and manage individual checklists for each client with personalized subdomains.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <ClipboardCheck className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Custom Checklists</h4>
              <p className="text-gray-600">
                Tailored checklists for each client's specific needs and property requirements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h4>
              <p className="text-gray-600">
                Monitor client progress and provide timely assistance throughout the buying process.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h4>
              <p className="text-gray-600">
                Enterprise-grade security with admin-controlled access and data protection.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h4>
              <p className="text-gray-600">
                Comprehensive admin panel for managing users, templates, and deployments.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Subdomain Deployment</h4>
              <p className="text-gray-600">
                Each client gets their own branded subdomain for a professional experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Elevate Your Client Experience?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Contact your administrator to get started with professional home buying checklists.
          </p>
          <Link
            to="/admin/login"
            className="bg-white hover:bg-gray-100 text-black font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 inline-flex items-center"
          >
            <Shield className="mr-2 h-5 w-5" />
            Access Admin Portal
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Home className="h-6 w-6 mr-2" />
              <span className="font-display font-semibold">Homebuyer's Checklist Pro</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Homebuyer's Checklist Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}