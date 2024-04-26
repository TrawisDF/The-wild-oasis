import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, status } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully check in`);
      queryClient.invalidateQueries({ active: true });
      navigate(-1, { replace: true });
    },
    onError: () => {
      toast.error('There was an error on check in');
    },
  });
  return { checkin, status };
}
