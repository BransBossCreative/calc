import { SavedData } from '../types';

const STORAGE_KEY = 'homebuyerChecklist';

export const getStoredData = (): SavedData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading stored data:', error);
  }
  
  return {
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
};

export const saveData = (data: SavedData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const clearStoredData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing stored data:', error);
  }
};