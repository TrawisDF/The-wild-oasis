import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    //signup have to be a single object
    mutationFn: (signupData) => signupApi(signupData),
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify's the new acccount the email address."
      );
      //take data and do the login process
    },
  });
  return { signup, isPending };
}
