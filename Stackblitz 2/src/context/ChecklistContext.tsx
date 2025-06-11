import React, { createContext, useContext, useEffect, useState } from 'react';
import { SavedData, SectionId } from '../types';
import { getStoredData, saveData } from '../utils/storage';
import { checklistData } from '../data/checklistData';

interface ChecklistContextType {
  data: SavedData;
  updatePropertyInfo: (info: Partial<SavedData['propertyInfo']>) => void;
  addContact: (contact: Omit<SavedData['contacts'][0], 'id'>) => void;
  removeContact: (id: string) => void;
  toggleTask: (sectionId: SectionId, taskIndex: number, completed: boolean) => void;
  toggleSubtask: (sectionId: SectionId, taskIndex: number, subtaskIndex: number, completed: boolean) => void;
  updateTaskNotes: (sectionId: SectionId, taskIndex: number, notes: string) => void;
  addCustomTask: (sectionId: SectionId, title: string) => void;
  removeCustomTask: (sectionId: SectionId, taskId: string) => void;
  toggleCustomTask: (sectionId: SectionId, taskId: string, completed: boolean) => void;
  updateGeneralNotes: (notes: string) => void;
  resetData: () => void;
  calculateSectionProgress: (sectionId: SectionId) => { total: number; completed: number; percentage: number };
  calculateOverallProgress: () => { total: number; completed: number; percentage: number };
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SavedData>(getStoredData);

  // Initialize task structure
  useEffect(() => {
    const initializedData = { ...data };
    let needsUpdate = false;

    Object.keys(checklistData).forEach(sectionId => {
      if (!initializedData.tasks[sectionId]) {
        initializedData.tasks[sectionId] = {
          tasks: [],
          customTasks: [],
        };
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      setData(initializedData);
      saveData(initializedData);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const updatePropertyInfo = (info: Partial<SavedData['propertyInfo']>) => {
    setData(prev => ({
      ...prev,
      propertyInfo: { ...prev.propertyInfo, ...info },
    }));
  };

  const addContact = (contact: Omit<SavedData['contacts'][0], 'id'>) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setData(prev => ({
      ...prev,
      contacts: [...prev.contacts, newContact],
    }));
  };

  const removeContact = (id: string) => {
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  const toggleTask = (sectionId: SectionId, taskIndex: number, completed: boolean) => {
    setData(prev => {
      const newData = { ...prev };
      if (!newData.tasks[sectionId]) {
        newData.tasks[sectionId] = { tasks: [], customTasks: [] };
      }
      if (!newData.tasks[sectionId].tasks[taskIndex]) {
        newData.tasks[sectionId].tasks[taskIndex] = { completed: false, notes: '', subtasks: {} };
      }
      newData.tasks[sectionId].tasks[taskIndex].completed = completed;
      return newData;
    });
  };

  const toggleSubtask = (sectionId: SectionId, taskIndex: number, subtaskIndex: number, completed: boolean) => {
    setData(prev => {
      const newData = { ...prev };
      if (!newData.tasks[sectionId]?.tasks[taskIndex]) {
        if (!newData.tasks[sectionId]) {
          newData.tasks[sectionId] = { tasks: [], customTasks: [] };
        }
        newData.tasks[sectionId].tasks[taskIndex] = { completed: false, notes: '', subtasks: {} };
      }
      newData.tasks[sectionId].tasks[taskIndex].subtasks[subtaskIndex] = completed;
      
      // Check if all subtasks are completed to auto-complete task
      const task = checklistData[sectionId].tasks[taskIndex];
      if (task.subtasks.length > 0) {
        const allCompleted = task.subtasks.every((_, index) => 
          newData.tasks[sectionId].tasks[taskIndex].subtasks[index]
        );
        newData.tasks[sectionId].tasks[taskIndex].completed = allCompleted;
      }
      
      return newData;
    });
  };

  const updateTaskNotes = (sectionId: SectionId, taskIndex: number, notes: string) => {
    setData(prev => {
      const newData = { ...prev };
      if (!newData.tasks[sectionId]?.tasks[taskIndex]) {
        if (!newData.tasks[sectionId]) {
          newData.tasks[sectionId] = { tasks: [], customTasks: [] };
        }
        newData.tasks[sectionId].tasks[taskIndex] = { completed: false, notes: '', subtasks: {} };
      }
      newData.tasks[sectionId].tasks[taskIndex].notes = notes;
      return newData;
    });
  };

  const addCustomTask = (sectionId: SectionId, title: string) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [sectionId]: {
          ...prev.tasks[sectionId],
          customTasks: [...(prev.tasks[sectionId]?.customTasks || []), newTask],
        },
      },
    }));
  };

  const removeCustomTask = (sectionId: SectionId, taskId: string) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [sectionId]: {
          ...prev.tasks[sectionId],
          customTasks: prev.tasks[sectionId]?.customTasks?.filter(task => task.id !== taskId) || [],
        },
      },
    }));
  };

  const toggleCustomTask = (sectionId: SectionId, taskId: string, completed: boolean) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [sectionId]: {
          ...prev.tasks[sectionId],
          customTasks: prev.tasks[sectionId]?.customTasks?.map(task =>
            task.id === taskId ? { ...task, completed } : task
          ) || [],
        },
      },
    }));
  };

  const updateGeneralNotes = (notes: string) => {
    setData(prev => ({
      ...prev,
      generalNotes: notes,
    }));
  };

  const resetData = () => {
    const emptyData: SavedData = {
      propertyInfo: {
        address: '',
        closingDate: '',
        purchasePrice: '',
        optionPeriodEnd: '',
        financingDeadline: '',
      },
      contacts: [],
      tasks: {},
      generalNotes: '',
    };
    
    // Initialize task structure
    Object.keys(checklistData).forEach(sectionId => {
      emptyData.tasks[sectionId] = {
        tasks: [],
        customTasks: [],
      };
    });
    
    setData(emptyData);
  };

  const calculateSectionProgress = (sectionId: SectionId) => {
    let total = 0;
    let completed = 0;
    
    // Count standard tasks
    const tasks = checklistData[sectionId].tasks;
    tasks.forEach((_, taskIndex) => {
      total++;
      if (data.tasks[sectionId]?.tasks?.[taskIndex]?.completed) {
        completed++;
      }
    });
    
    // Count custom tasks
    const customTasks = data.tasks[sectionId]?.customTasks || [];
    total += customTasks.length;
    completed += customTasks.filter(task => task.completed).length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  };

  const calculateOverallProgress = () => {
    let total = 0;
    let completed = 0;
    
    Object.keys(checklistData).forEach(sectionId => {
      const progress = calculateSectionProgress(sectionId as SectionId);
      total += progress.total;
      completed += progress.completed;
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, percentage };
  };

  return (
    <ChecklistContext.Provider value={{
      data,
      updatePropertyInfo,
      addContact,
      removeContact,
      toggleTask,
      toggleSubtask,
      updateTaskNotes,
      addCustomTask,
      removeCustomTask,
      toggleCustomTask,
      updateGeneralNotes,
      resetData,
      calculateSectionProgress,
      calculateOverallProgress,
    }}>
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklist() {
  const context = useContext(ChecklistContext);
  if (context === undefined) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
}