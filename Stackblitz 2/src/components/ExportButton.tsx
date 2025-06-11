import React from 'react';
import { Download } from 'lucide-react';
import { useChecklist } from '../context/ChecklistContext';
import { exportChecklist } from '../utils/exportUtils';

export function ExportButton() {
  const { data } = useChecklist();

  const handleExport = () => {
    exportChecklist(data);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
    >
      <Download className="h-4 w-4 mr-2" />
      Export Checklist
    </button>
  );
}