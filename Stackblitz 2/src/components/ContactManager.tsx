import React, { useState } from 'react';
import { useChecklist } from '../context/ChecklistContext';
import { Plus, Phone, Mail, Trash2, X } from 'lucide-react';
import { Contact } from '../types';

export function ContactManager() {
  const { data, addContact, removeContact } = useChecklist();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Agent' as Contact['role'],
    phone: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      addContact(formData);
      setFormData({ name: '', role: 'Agent', phone: '', email: '' });
      setShowModal(false);
    }
  };

  const roleIcons: Record<Contact['role'], string> = {
    Agent: '🏠',
    Lender: '💰',
    Inspector: '🔍',
    Title: '📄',
    Insurance: '🛡️',
    Other: '👤'
  };

  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Important Contacts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-3 rounded-md text-sm transition duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Contact
        </button>
      </div>

      <div className="space-y-3">
        {data.contacts.length > 0 ? (
          data.contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{roleIcons[contact.role]}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  <p className="text-sm text-gray-600">{contact.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-black hover:text-gray-700 p-2 rounded-md hover:bg-gray-200 transition-colors"
                    title="Call"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-black hover:text-gray-700 p-2 rounded-md hover:bg-gray-200 transition-colors"
                    title="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => removeContact(contact.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                  title="Remove contact"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic text-center py-4">
            No contacts added yet. Add your real estate agent, lender, and other important contacts.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Contact</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as Contact['role'] }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                >
                  <option value="Agent">Real Estate Agent</option>
                  <option value="Lender">Mortgage Lender</option>
                  <option value="Inspector">Home Inspector</option>
                  <option value="Title">Title Company</option>
                  <option value="Insurance">Insurance Agent</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}