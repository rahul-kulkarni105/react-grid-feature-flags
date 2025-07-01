import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

// Dynamic import for DataGrid component to enable code splitting
const DataGridComponent = React.lazy(() => import('./components/DataGrid'));

const theme = createTheme();

const LoadingFallback: React.FC = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='400px'
  >
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Data Grid with Feature Flags
        </Typography>
        <Suspense fallback={<LoadingFallback />}>
          <DataGridComponent />
        </Suspense>
      </Container>
    </ThemeProvider>
  );
};

export default App;
