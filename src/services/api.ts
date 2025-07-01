import { RowData } from '../types';
import { mockData } from '../mocks/mockData';

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
