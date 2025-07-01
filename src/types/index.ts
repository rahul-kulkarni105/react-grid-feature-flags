import {
  GridRowModesModel,
  GridEventListener,
  GridRowModel,
  GridRowId,
} from '@mui/x-data-grid';

// =====================
// CORE DATA INTERFACES
// =====================

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

// =====================
// UI COMPONENT INTERFACES
// =====================

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export interface NotificationProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

export interface DataGridToolbarProps {
  onAddRecord: () => void;
}

export interface DataGridTableProps {
  rows: RowData[];
  rowModesModel: GridRowModesModel;
  loading: boolean;
  onAddRecord: () => void;
  onRowModesModelChange: (newRowModesModel: GridRowModesModel) => void;
  onRowEditStop: GridEventListener<'rowEditStop'>;
  onProcessRowUpdate: (newRow: GridRowModel) => GridRowModel;
  onProcessRowUpdateError: (error: Error) => void;
  onEditClick: (id: GridRowId) => () => void;
  onSaveClick: (id: GridRowId) => () => void;
  onDeleteClick: (id: GridRowId) => () => void;
  onCancelClick: (id: GridRowId) => () => void;
}

// =====================
// LEGACY/MODAL INTERFACES
// =====================

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: FormData;
  onSave: (updatedRow: FormData) => void;
}

export interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  severity?: 'warning' | 'error' | 'info';
}
