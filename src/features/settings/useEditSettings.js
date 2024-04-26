import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';

export function useEditSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, status } = useMutation({
    //mutate fucntion will recieve only one object
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting successfully edited');
      queryClient.invalidateQueries({ queryKey: ['setting'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editSetting, status };
}
