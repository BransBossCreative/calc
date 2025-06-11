import React, { useState } from 'react';
import { useChecklist } from '../context/ChecklistContext';
import { Save, Check } from 'lucide-react';

export function GeneralNotes() {
  const { data, updateGeneralNotes } = useChecklist();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 border-t">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">General Notes</h2>
      <div className="mb-4">
        <textarea
          value={data.generalNotes}
          onChange={(e) => updateGeneralNotes(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-black focus:border-black resize-none"
          placeholder="Add any general notes about your home buying process..."
        />
      </div>
      <button
        onClick={handleSave}
        className={`font-medium py-2 px-4 rounded-md transition duration-200 flex items-center ${
          saved
            ? 'bg-green-600 text-white'
            : 'bg-black hover:bg-gray-800 text-white'
        }`}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Saved!
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Notes
          </>
        )}
      </button>
    </div>
  );
}