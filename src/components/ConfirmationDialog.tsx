import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { ConfirmationDialogProps } from '../types';

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  severity = 'warning',
}) => {
  const getConfirmButtonColor = () => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby='confirmation-dialog-title'
      aria-describedby='confirmation-dialog-description'
    >
      <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirmation-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='inherit'>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={getConfirmButtonColor()}
          variant='contained'
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
