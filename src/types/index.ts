export interface PropertyInfo {
  address: string;
  closingDate: string;
  purchasePrice: string;
  optionPeriodEnd: string;
  financingDeadline: string;
}

export interface Contact {
  id: string;
  name: string;
  role: 'Agent' | 'Lender' | 'Inspector' | 'Title' | 'Insurance' | 'Other';
  phone: string;
  email: string;
}

export interface Subtask {
  title: string;
  completed?: boolean;
}

export interface Task {
  title: string;
  subtasks: Subtask[];
  completed?: boolean;
  notes?: string;
}

export interface CustomTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface ChecklistSection {
  name: string;
  tasks: Task[];
}

export interface SavedTaskData {
  completed: boolean;
  notes: string;
  subtasks: { [key: number]: boolean };
}

export interface SavedData {
  propertyInfo: PropertyInfo;
  contacts: Contact[];
  tasks: {
    [sectionId: string]: {
      tasks: SavedTaskData[];
      customTasks: CustomTask[];
    };
  };
  generalNotes: string;
}

export type SectionId = 'accepted-offer' | 'option-period' | 'pending' | 'final-week' | 'closing';