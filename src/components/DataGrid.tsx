import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchData,
  updateRow,
  syncData,
  addRow,
  deleteRow,
} from '../services/api';
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowId,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { Box, Button, Paper, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { RowData } from '../types';

const DataGridComponent = () => {
  const queryClient = useQueryClient();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
  const [newRows, setNewRows] = useState<RowData[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Combine server data with new rows being added
  const rows = [...data, ...newRows];

  const handleAddRecord = () => {
    const newId = Math.max(...rows.map(row => row.id), 0) + 1000; // Use high ID for new records
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleAddRecord}
        >
          Add Feature Flag
        </Button>
      </GridToolbarContainer>
    );
  }

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
      setSnackbar({
        open: true,
        message: 'Row updated successfully!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to update row',
        severity: 'error',
      });
    },
  });

  const addMutation = useMutation({
    mutationFn: addRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
      setSnackbar({
        open: true,
        message: 'Feature flag added successfully!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to add feature flag',
        severity: 'error',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
      setSnackbar({
        open: true,
        message: 'Feature flag deleted successfully!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Failed to delete feature flag',
        severity: 'error',
      });
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Feature Flag Name',
      width: 250,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 120,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: true,
    },
    {
      field: 'environment',
      headerName: 'Environment',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['development', 'staging', 'production'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === 'rowFocusOut') {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteMutation.mutate(Number(id));
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
      // Add new row
      const { isNew: _, ...rowData } = newRow as any;
      addMutation.mutate(rowData);
      // Remove from newRows since it will be added to server data
      setNewRows(newRows.filter(row => row.id !== newRow.id));
    } else {
      // Update existing row
      updateMutation.mutate({ id: newRow.id, updatedRow: newRow });
    }

    const updatedRow = { ...newRow };
    delete (updatedRow as any).isNew;
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.error('Error updating row:', error);
  };

  const handleSync = () => {
    syncData()
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['data'] });
        setSnackbar({
          open: true,
          message: 'Data synced successfully!',
          severity: 'success',
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Failed to sync data',
          severity: 'error',
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Button variant='contained' onClick={handleSync} sx={{ mb: 2 }}>
          Sync Data
        </Button>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          slots={{
            toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          loading={
            updateMutation.isPending ||
            addMutation.isPending ||
            deleteMutation.isPending
          }
          sx={{
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        />
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DataGridComponent;
