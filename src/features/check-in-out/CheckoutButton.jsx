import { useCheckout } from './useCheckout';
import Button from '../../ui/Button';

function CheckoutButton({ bookingId }) {
  const { checkout, isPending } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
      disabled={isPending}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
