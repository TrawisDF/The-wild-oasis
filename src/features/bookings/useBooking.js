import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';

export function useBooking({ id }) {
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id), //the function have to return a promise
  });
  return { booking, isLoading };
}
