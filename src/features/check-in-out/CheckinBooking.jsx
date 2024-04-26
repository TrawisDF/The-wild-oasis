import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import { useParams } from 'react-router-dom';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import CheckBox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckin } from './useCheckin';
import { useBooking } from '../bookings/useBooking';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { id } = useParams();
  const { booking, isLoading } = useBooking({ id });
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  const { checkin, status } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  const isCheckingin = status === 'pending';

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        id: bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ id: bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            disabled={addBreakfast}
            onChange={() => {
              setAddBreakfast((x) => !x);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          disabled={confirmPaid}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `
             ${formatCurrency(totalPrice + optionalBreakfastPrice)}
            (${formatCurrency(totalPrice)} +
                ${formatCurrency(optionalBreakfastPrice)} breakfast)`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking
        </Button>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
