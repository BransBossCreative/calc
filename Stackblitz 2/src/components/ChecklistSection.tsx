import React, { useState } from 'react';
import { useChecklist } from '../context/ChecklistContext';
import { checklistData } from '../data/checklistData';
import { SectionId } from '../types';
import { ProgressBar } from './ProgressBar';
import { Plus, ChevronDown, ChevronRight, StickyNote, Trash2 } from 'lucide-react';

interface ChecklistSectionProps {
  sectionId: SectionId;
  onCelebration: (title: string, message: string) => void;
}

export function ChecklistSection({ sectionId, onCelebration }: ChecklistSectionProps) {
  const {
    data,
    toggleTask,
    toggleSubtask,
    updateTaskNotes,
    addCustomTask,
    removeCustomTask,
    toggleCustomTask,
    calculateSectionProgress
  } = useChecklist();

  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [notesExpanded, setNotesExpanded] = useState<Set<number>>(new Set());
  const [customTaskInput, setCustomTaskInput] = useState('');

  const section = checklistData[sectionId];
  const sectionData = data.tasks[sectionId];
  const progress = calculateSectionProgress(sectionId);

  const toggleTaskExpansion = (taskIndex: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskIndex)) {
      newExpanded.delete(taskIndex);
    } else {
      newExpanded.add(taskIndex);
    }
    setExpandedTasks(newExpanded);
  };

  const toggleNotesExpansion = (taskIndex: number) => {
    const newExpanded = new Set(notesExpanded);
    if (newExpanded.has(taskIndex)) {
      newExpanded.delete(taskIndex);
    } else {
      newExpanded.add(taskIndex);
    }
    setNotesExpanded(newExpanded);
  };

  const handleTaskToggle = (taskIndex: number, completed: boolean) => {
    toggleTask(sectionId, taskIndex, completed);
    
    // Check if section is now complete
    setTimeout(() => {
      const newProgress = calculateSectionProgress(sectionId);
      if (newProgress.percentage === 100 && newProgress.total > 0) {
        onCelebration(
          `${section.name} Complete!`,
          "You've completed all tasks in this section!"
        );
      }
    }, 100);
  };

  const handleAddCustomTask = () => {
    if (customTaskInput.trim()) {
      addCustomTask(sectionId, customTaskInput.trim());
      setCustomTaskInput('');
    }
  };

  return (
    <div className="p-6">
      {/* Section Progress */}
      <div className="mb-6">
        <ProgressBar
          percentage={progress.percentage}
          label={`${section.name} Progress`}
          showPercentage={true}
          size="md"
        />
        <div className="text-sm text-gray-600 mt-1">
          {progress.completed} of {progress.total} tasks completed
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {section.tasks.map((task, taskIndex) => {
          const taskData = sectionData?.tasks?.[taskIndex] || { completed: false, notes: '', subtasks: {} };
          const isExpanded = expandedTasks.has(taskIndex);
          const isNotesExpanded = notesExpanded.has(taskIndex);
          const hasSubtasks = task.subtasks && task.subtasks.length > 0;

          return (
            <div key={taskIndex} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Task Header */}
              <div className="p-4 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={taskData.completed}
                    onChange={(e) => handleTaskToggle(taskIndex, e.target.checked)}
                    className="h-5 w-5 text-black rounded border-gray-300 focus:ring-2 focus:ring-black"
                  />
                  <span className={`flex-1 font-medium ${taskData.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </span>
                  <button
                    onClick={() => toggleNotesExpansion(taskIndex)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="Add notes"
                  >
                    <StickyNote className="h-4 w-4" />
                  </button>
                  {hasSubtasks && (
                    <button
                      onClick={() => toggleTaskExpansion(taskIndex)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              {isNotesExpanded && (
                <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                  <textarea
                    value={taskData.notes}
                    onChange={(e) => updateTaskNotes(sectionId, taskIndex, e.target.value)}
                    placeholder="Add notes for this task..."
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Subtasks */}
              {hasSubtasks && isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {task.subtasks.map((subtask, subtaskIndex) => {
                    const isSubtaskCompleted = taskData.subtasks[subtaskIndex] || false;
                    return (
                      <div key={subtaskIndex} className="flex items-center p-3 border-b border-gray-200 last:border-b-0">
                        <input
                          type="checkbox"
                          checked={isSubtaskCompleted}
                          onChange={(e) => toggleSubtask(sectionId, taskIndex, subtaskIndex, e.target.checked)}
                          className="h-4 w-4 text-black rounded border-gray-300 focus:ring-2 focus:ring-black mr-3"
                        />
                        <span className={`text-sm ${isSubtaskCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {subtask.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Custom Tasks */}
        {sectionData?.customTasks?.map((task, index) => (
          <div key={`custom-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => toggleCustomTask(sectionId, task.id, e.target.checked)}
                  className="h-5 w-5 text-black rounded border-gray-300 focus:ring-2 focus:ring-black"
                />
                <span className={`flex-1 font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </span>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">Custom</span>
                <button
                  onClick={() => removeCustomTask(sectionId, task.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                  title="Remove custom task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Task */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={customTaskInput}
            onChange={(e) => setCustomTaskInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTask()}
            placeholder="Add a custom task..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
          />
          <button
            onClick={handleAddCustomTask}
            disabled={!customTaskInput.trim()}
            className="bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}