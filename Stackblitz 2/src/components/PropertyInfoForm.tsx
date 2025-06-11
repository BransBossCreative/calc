import React, { useState } from 'react';
import { useChecklist } from '../context/ChecklistContext';
import { Save, Check } from 'lucide-react';

export function PropertyInfoForm() {
  const { data, updatePropertyInfo } = useChecklist();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (field: string, value: string) => {
    updatePropertyInfo({ [field]: value });
  };

  return (
    <div className="p-6 bg-gray-50 border-b">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
          <input
            type="text"
            value={data.propertyInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Enter property address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Closing Date</label>
          <input
            type="date"
            value={data.propertyInfo.closingDate}
            onChange={(e) => handleChange('closingDate', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
          <input
            type="text"
            value={data.propertyInfo.purchasePrice}
            onChange={(e) => handleChange('purchasePrice', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
            placeholder="$000,000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Option Period Ends</label>
          <input
            type="date"
            value={data.propertyInfo.optionPeriodEnd}
            onChange={(e) => handleChange('optionPeriodEnd', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Financing Deadline</label>
          <input
            type="date"
            value={data.propertyInfo.financingDeadline}
            onChange={(e) => handleChange('financingDeadline', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
          />
        </div>
      </div>
      <div className="mt-4">
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
              Save Property Info
            </>
          )}
        </button>
      </div>
    </div>
  );
}