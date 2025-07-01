import { type FC } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModes,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { RowData, DataGridTableProps } from '../types';
import { DataGridToolbar } from './DataGridToolbar';

export const DataGridTable: FC<DataGridTableProps> = ({
  rows,
  rowModesModel,
  loading,
  onAddRecord,
  onRowModesModelChange,
  onRowEditStop,
  onProcessRowUpdate,
  onProcessRowUpdateError,
  onEditClick,
  onSaveClick,
  onDeleteClick,
  onCancelClick,
}) => {
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
              onClick={onSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={onCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={onEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={onDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode='row'
      rowModesModel={rowModesModel}
      onRowModesModelChange={onRowModesModelChange}
      onRowEditStop={onRowEditStop}
      processRowUpdate={onProcessRowUpdate}
      onProcessRowUpdateError={onProcessRowUpdateError}
      slots={{
        toolbar: () => <DataGridToolbar onAddRecord={onAddRecord} />,
      }}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      loading={loading}
      sx={{
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    />
  );
};
