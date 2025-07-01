import { type FC } from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGridToolbarProps } from '../types';

export const DataGridToolbar: FC<DataGridToolbarProps> = ({ onAddRecord }) => {
  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={onAddRecord}>
        Add Feature Flag
      </Button>
    </GridToolbarContainer>
  );
};
