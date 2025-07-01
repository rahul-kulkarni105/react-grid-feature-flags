import { RowData } from '../types';

// Mock data for demonstration
const mockData: RowData[] = [
  {
    id: 1,
    name: 'Feature Flag A',
    active: true,
    description: 'User authentication feature',
    environment: 'production',
  },
  {
    id: 2,
    name: 'Feature Flag B',
    active: false,
    description: 'New dashboard layout',
    environment: 'staging',
  },
  {
    id: 3,
    name: 'Feature Flag C',
    active: true,
    description: 'Enhanced search functionality',
    environment: 'production',
  },
  {
    id: 4,
    name: 'Feature Flag D',
    active: false,
    description: 'Beta payment gateway',
    environment: 'development',
  },
  {
    id: 5,
    name: 'Feature Flag E',
    active: true,
    description: 'Mobile app integration',
    environment: 'production',
  },
  {
    id: 6,
    name: 'Feature Flag F',
    active: false,
    description: 'Advanced analytics',
    environment: 'staging',
  },
  {
    id: 7,
    name: 'Feature Flag G',
    active: true,
    description: 'Real-time notifications',
    environment: 'production',
  },
  {
    id: 8,
    name: 'Feature Flag H',
    active: false,
    description: 'Dark mode theme',
    environment: 'development',
  },
  {
    id: 9,
    name: 'Feature Flag I',
    active: true,
    description: 'Social media login',
    environment: 'production',
  },
  {
    id: 10,
    name: 'Feature Flag J',
    active: false,
    description: 'Voice commands',
    environment: 'staging',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let dataStore = [...mockData];

export const fetchData = async (): Promise<RowData[]> => {
  await delay(500); // Simulate network delay
  return [...dataStore];
};

export const updateRow = async (
  rowId: number,
  updatedRow: RowData
): Promise<RowData> => {
  await delay(300); // Simulate network delay

  const index = dataStore.findIndex(row => row.id === rowId);
  if (index !== -1) {
    dataStore[index] = { ...updatedRow };
    return dataStore[index];
  }
  throw new Error(`Row with id ${rowId} not found`);
};

export const syncData = async (): Promise<RowData[]> => {
  await delay(800); // Simulate network delay

  // Simulate fetching fresh data from server
  // In a real app, this would fetch the latest data
  return [...dataStore];
};

export const addRow = async (newRow: Partial<RowData>): Promise<RowData> => {
  await delay(400); // Simulate network delay

  const newId = Math.max(...dataStore.map(row => row.id)) + 1;
  const row: RowData = {
    id: newId,
    name: newRow.name || `New Feature Flag ${newId}`,
    active: newRow.active ?? false,
    description: newRow.description || '',
    environment: newRow.environment || 'development',
    ...newRow,
  };
  dataStore.push(row);
  return row;
};

export const deleteRow = async (rowId: number): Promise<void> => {
  await delay(300); // Simulate network delay

  const index = dataStore.findIndex(row => row.id === rowId);
  if (index === -1) {
    throw new Error(`Row with id ${rowId} not found`);
  }
  dataStore.splice(index, 1);
};
