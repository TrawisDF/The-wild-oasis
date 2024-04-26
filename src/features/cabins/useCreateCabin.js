import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, status } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      //problem here
      toast.error(err.message);
    },
  });
  return { createCabin, status };
}
