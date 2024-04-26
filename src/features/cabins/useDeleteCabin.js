import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { status, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        // make sure this is the same as queryKey from useQuery
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteCabin, status };
}
