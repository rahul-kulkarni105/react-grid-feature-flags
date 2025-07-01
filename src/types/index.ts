export interface RowData {
  id: number;
  name: string;
  active: boolean;
  description?: string;
  environment?: string;
  isNew?: boolean; // For tracking new rows during creation
  [key: string]: boolean | number | string | undefined; // Allow additional properties
}

export interface ApiResponse {
  data: RowData[];
  total: number;
}

export interface UpdateRowPayload {
  id: number;
  updatedValues: Partial<RowData>;
}

export interface SyncResponse {
  updatedData: RowData[];
}
