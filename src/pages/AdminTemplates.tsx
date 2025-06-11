import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { checklistData } from '../data/checklistData';
import { SectionId } from '../types';

export function AdminTemplates() {
  const [editingSection, setEditingSection] = useState<SectionId | null>(null);
  const [editingTask, setEditingTask] = useState<{ sectionId: SectionId; taskIndex: number } | null>(null);

  const handleSaveTask = () => {
    // In a real app, this would save to the backend
    setEditingTask(null);
  };

  const handleDeleteTask = (sectionId: SectionId, taskIndex: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      // In a real app, this would delete from the backend
      console.log('Delete task:', sectionId, taskIndex);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Templates</h1>
            <p className="text-gray-600">Manage checklist templates and customize tasks</p>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(checklistData).map(([sectionId, section]) => (
            <div key={sectionId} className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{section.name}</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingSection(editingSection === sectionId ? null : sectionId as SectionId)}
                      className="text-gray-400 hover:text-gray-600 p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {section.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {editingTask?.sectionId === sectionId && editingTask?.taskIndex === taskIndex ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                defaultValue={task.title}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                              />
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Subtasks:</label>
                                {task.subtasks.map((subtask, subtaskIndex) => (
                                  <div key={subtaskIndex} className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      defaultValue={subtask.title}
                                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
                                    />
                                    <button className="text-red-500 hover:text-red-700 p-1">
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                <button className="text-black hover:text-gray-800 text-sm font-medium">
                                  + Add Subtask
                                </button>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleSaveTask}
                                  className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded text-sm flex items-center"
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingTask(null)}
                                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                              {task.subtasks.length > 0 && (
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {task.subtasks.map((subtask, subtaskIndex) => (
                                    <li key={subtaskIndex}>{subtask.title}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>
                        {editingTask?.sectionId !== sectionId || editingTask?.taskIndex !== taskIndex ? (
                          <div className="flex space-x-1 ml-4">
                            <button
                              onClick={() => setEditingTask({ sectionId: sectionId as SectionId, taskIndex })}
                              className="text-gray-400 hover:text-gray-600 p-1"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(sectionId as SectionId, taskIndex)}
                              className="text-red-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                {editingSection === sectionId && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Template Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button className="text-red-600 hover:text-red-700 font-medium">
            Reset to Default Template
          </button>
          <div className="flex space-x-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg">
              Preview Changes
            </button>
            <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg">
              Publish Template
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}