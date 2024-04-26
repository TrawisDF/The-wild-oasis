import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    mutate: checkout,
    status,
    isPending,
  } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully check out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error('There was an error on check in');
    },
  });
  return { checkout, status, isPending };
}
