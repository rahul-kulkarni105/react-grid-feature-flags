import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchData,
  updateRow,
  syncData,
  addRow,
  deleteRow,
} from '../services/api';
import {
  GridRowModel,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { RowData } from '../types';

export const useDataGrid = (
  onShowSnackbar: (message: string, severity: 'success' | 'error') => void
) => {
  const queryClient = useQueryClient();
  const [newRows, setNewRows] = useState<RowData[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    rowId: GridRowId | null;
    rowName: string;
  }>({
    open: false,
    rowId: null,
    rowName: '',
  });

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  // Combine server data with new rows being added
  const rows = [...data, ...newRows];

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updatedRow,
    }: {
      id: GridRowId;
      updatedRow: GridRowModel;
    }) => updateRow(Number(id), updatedRow as RowData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
      onShowSnackbar('Row updated successfully!', 'success');
    },
    onError: () => {
      onShowSnackbar('Failed to update row', 'error');
    },
  });

  const addMutation = useMutation({
    mutationFn: addRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
      onShowSnackbar('Feature flag added successfully!', 'success');
    },
    onError: () => {
      onShowSnackbar('Failed to add feature flag', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
      onShowSnackbar('Feature flag deleted successfully!', 'success');
    },
    onError: () => {
      onShowSnackbar('Failed to delete feature flag', 'error');
    },
  });

  const handleAddRecord = () => {
    const newId = Math.max(...rows.map(row => row.id), 0) + 1000;
    const newRow: RowData & { isNew: boolean } = {
      id: newId,
      name: '',
      active: false,
      description: '',
      environment: 'development',
      isNew: true,
    };
    setNewRows(oldRows => [...oldRows, newRow]);
    setRowModesModel(oldModel => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const row = rows.find(row => row.id === id);
    if (row) {
      setDeleteConfirmation({
        open: true,
        rowId: id,
        rowName: row.name,
      });
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow!.isNew) {
      setNewRows(newRows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const isNew = (newRow as any).isNew;
    if (isNew) {
      const { isNew: _, ...rowData } = newRow as any;
      addMutation.mutate(rowData);
      setNewRows(newRows.filter(row => row.id !== newRow.id));
    } else {
      updateMutation.mutate({ id: newRow.id, updatedRow: newRow });
    }

    const updatedRow = { ...newRow };
    delete (updatedRow as any).isNew;
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSync = () => {
    syncData()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['data'] });
        onShowSnackbar('Data synced successfully!', 'success');
      })
      .catch(() => {
        onShowSnackbar('Failed to sync data', 'error');
      });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.rowId !== null) {
      deleteMutation.mutate(Number(deleteConfirmation.rowId));
      setDeleteConfirmation({ open: false, rowId: null, rowName: '' });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ open: false, rowId: null, rowName: '' });
  };

  const isLoading_mutations =
    updateMutation.isPending ||
    addMutation.isPending ||
    deleteMutation.isPending;

  return {
    // Data
    rows,
    isLoading,
    error,
    rowModesModel,
    isLoading_mutations,
    deleteConfirmation,
    // Handlers
    handleAddRecord,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
    processRowUpdate,
    handleRowModesModelChange,
    handleSync,
    handleConfirmDelete,
    handleCancelDelete,
  };
};
