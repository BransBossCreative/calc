import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Search, Filter, Download, MoreHorizontal, Eye, Plus, Globe, ExternalLink } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Inactive';
  property: string;
  subdomain: string;
  agentName: string;
}

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    property: '',
    subdomain: '',
    agentName: ''
  });

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      joinDate: '2025-01-15',
      progress: 85,
      status: 'Active',
      property: '123 Oak Street, Austin, TX',
      subdomain: 'sarah-johnson',
      agentName: 'Mike Rodriguez'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      joinDate: '2025-01-10',
      progress: 100,
      status: 'Completed',
      property: '456 Pine Avenue, Dallas, TX',
      subdomain: 'michael-chen',
      agentName: 'Lisa Thompson'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      joinDate: '2025-01-12',
      progress: 45,
      status: 'Active',
      property: '789 Maple Drive, Houston, TX',
      subdomain: 'emily-rodriguez',
      agentName: 'David Wilson'
    },
    {
      id: '4',
      name: 'David Smith',
      email: 'david.smith@email.com',
      joinDate: '2024-12-28',
      progress: 20,
      status: 'Inactive',
      property: '321 Elm Street, San Antonio, TX',
      subdomain: 'david-smith',
      agentName: 'Jennifer Lee'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      joinDate: '2025-01-18',
      progress: 67,
      status: 'Active',
      property: '654 Cedar Lane, Fort Worth, TX',
      subdomain: 'lisa-wang',
      agentName: 'Robert Garcia'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the user and deploy to subdomain
    console.log('Creating user and deploying to subdomain:', newUser);
    
    // Reset form and close modal
    setNewUser({
      name: '',
      email: '',
      property: '',
      subdomain: '',
      agentName: ''
    });
    setShowCreateModal(false);
    
    // Show success message (in a real app, this would be handled by the API response)
    alert(`User created successfully! Checklist deployed to: ${newUser.subdomain}.homebuyerchecklist.com`);
  };

  const generateSubdomain = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setNewUser(prev => ({
      ...prev,
      name,
      subdomain: generateSubdomain(name)
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Create and manage client checklists with subdomain deployment</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Client Checklist
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Users
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black appearance-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subdomain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={user.property}>
                        {user.property}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.agentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-400 mr-2" />
                        <a 
                          href={`https://${user.subdomain}.homebuyerchecklist.com`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {user.subdomain}.homebuyerchecklist.com
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${user.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{user.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1" title="More Options">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No clients found</div>
              <div className="text-gray-400">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-display font-semibold mb-4">Create New Client Checklist</h3>
              <p className="text-gray-600 mb-6">
                Create a personalized checklist for your client and deploy it to a custom subdomain.
              </p>
              
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="Enter client's full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="client@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    value={newUser.property}
                    onChange={(e) => setNewUser(prev => ({ ...prev, property: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="123 Main Street, City, State"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Real Estate Agent
                  </label>
                  <input
                    type="text"
                    value={newUser.agentName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, agentName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Agent's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subdomain *
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={newUser.subdomain}
                      onChange={(e) => setNewUser(prev => ({ ...prev, subdomain: e.target.value }))}
                      className="flex-1 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="client-name"
                      required
                    />
                    <span className="px-3 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-gray-600">
                      .homebuyerchecklist.com
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This will be the URL where your client accesses their checklist
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Deployment Preview</h4>
                  <p className="text-sm text-blue-800">
                    Your client will access their personalized checklist at:
                  </p>
                  <p className="text-sm font-mono text-blue-900 mt-1">
                    https://{newUser.subdomain || 'client-name'}.homebuyerchecklist.com
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Create & Deploy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-black border border-black rounded-md hover:bg-gray-800">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}