import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchData, updateRow, syncData } from '../services/api';
import { RowData } from '../types';

const useDataApi = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  const mutation = useMutation({
    mutationFn: (row: RowData) => updateRow(row.id, row),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
    },
  });

  const syncMutation = useMutation({
    mutationFn: syncData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
    },
  });

  const updateRowData = (row: RowData) => {
    mutation.mutate(row);
  };

  const syncRowData = () => {
    syncMutation.mutate();
  };

  return {
    data,
    error,
    isLoading,
    updateRowData,
    syncRowData,
  };
};

export default useDataApi;
