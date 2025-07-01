import { GridEventListener } from '@mui/x-data-grid';
import { Box, Button, Paper } from '@mui/material';
import { useDataGrid } from '../hooks/useDataGrid';
import { useSnackbar } from '../hooks/useSnackbar';
import { DataGridTable } from './DataGridTable';
import { Notification } from './Notification';
import { ConfirmationDialog } from './ConfirmationDialog';

const DataGrid = () => {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();
  const {
    rows,
    isLoading,
    error,
    rowModesModel,
    isLoading_mutations,
    deleteConfirmation,
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
  } = useDataGrid(showSnackbar);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === 'rowFocusOut') {
      event.defaultMuiPrevented = true;
    }
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.error('Error updating row:', error);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Button variant='contained' onClick={handleSync} sx={{ mb: 2 }}>
          Sync Data
        </Button>
        <DataGridTable
          rows={rows}
          rowModesModel={rowModesModel}
          loading={isLoading_mutations}
          onAddRecord={handleAddRecord}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          onProcessRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
          onDeleteClick={handleDeleteClick}
          onCancelClick={handleCancelClick}
        />
      </Paper>
      <Notification
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideSnackbar}
      />
      <ConfirmationDialog
        open={deleteConfirmation.open}
        title='Delete Feature Flag'
        message={`Are you sure you want to delete "${deleteConfirmation.rowName}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText='Delete'
        cancelText='Cancel'
        severity='error'
      />
    </Box>
  );
};

export default DataGrid;
