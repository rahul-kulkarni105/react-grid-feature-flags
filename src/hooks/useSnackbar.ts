import { useState } from 'react';
import { SnackbarState } from '../types';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const hideSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
