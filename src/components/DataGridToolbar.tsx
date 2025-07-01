import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface DataGridToolbarProps {
  onAddRecord: () => void;
}

export const DataGridToolbar: React.FC<DataGridToolbarProps> = ({
  onAddRecord,
}) => {
  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={onAddRecord}>
        Add Feature Flag
      </Button>
    </GridToolbarContainer>
  );
};
