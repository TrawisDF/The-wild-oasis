import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins, //the function have to return a promise
  });
  return { cabins, isLoading };
}
