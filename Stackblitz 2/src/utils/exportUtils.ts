import { SavedData, SectionId } from '../types';
import { checklistData } from '../data/checklistData';

export const exportChecklist = (data: SavedData): void => {
  let exportText = "HOMEBUYER'S CHECKLIST\n\n";
  
  // Add property info
  const info = data.propertyInfo;
  if (info.address) exportText += `Property: ${info.address}\n`;
  if (info.closingDate) exportText += `Closing Date: ${info.closingDate}\n`;
  if (info.purchasePrice) exportText += `Purchase Price: ${info.purchasePrice}\n`;
  exportText += "\n";
  
  // Add tasks by section
  Object.keys(checklistData).forEach(tabId => {
    const sectionId = tabId as SectionId;
    exportText += `${checklistData[sectionId].name.toUpperCase()}\n`;
    
    // Standard tasks
    checklistData[sectionId].tasks.forEach((task, taskIndex) => {
      const isCompleted = data.tasks[sectionId]?.tasks?.[taskIndex]?.completed || false;
      exportText += `${isCompleted ? '✅' : '⬜'} ${task.title}\n`;
      
      // Subtasks
      if (task.subtasks && task.subtasks.length > 0) {
        task.subtasks.forEach((subtask, subtaskIndex) => {
          const isSubtaskCompleted = data.tasks[sectionId]?.tasks?.[taskIndex]?.subtasks?.[subtaskIndex] || false;
          exportText += `   ${isSubtaskCompleted ? '✅' : '⬜'} ${subtask.title}\n`;
        });
      }
      
      // Notes
      const notes = data.tasks[sectionId]?.tasks?.[taskIndex]?.notes;
      if (notes) {
        exportText += `   📝 Notes: ${notes}\n`;
      }
    });
    
    // Custom tasks
    const customTasks = data.tasks[sectionId]?.customTasks;
    if (customTasks && customTasks.length > 0) {
      customTasks.forEach(task => {
        exportText += `${task.completed ? '✅' : '⬜'} ${task.title} (Custom)\n`;
      });
    }
    
    exportText += "\n";
  });
  
  // Add general notes
  if (data.generalNotes) {
    exportText += "GENERAL NOTES\n";
    exportText += data.generalNotes + "\n";
  }
  
  // Create and download file
  const blob = new Blob([exportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Homebuyer_Checklist.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};