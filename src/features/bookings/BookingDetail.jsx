import styled from 'styled-components';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { id } = useParams();
  const { booking, isLoading } = useBooking({ id });
  const { checkout, status: isCheckingOut } = useCheckout();
  const { deleteBooking, status: deletingBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  //isLoading have to placed before destructed data from async function
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

  const { status } = booking;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === 'unconfirmed' && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>Check-in</Button>
          )}
          {status === 'checked-in' && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkout(id);
              }}
              disabled={isCheckingOut === 'pending'}
            >
              Check-out
            </Button>
          )}
          <Modal.Open opens='delete-booking'>
            <Button $variation='danger' icon={<HiTrash />}>
              Delete Booking #{id}
            </Button>
          </Modal.Open>
          <Button $variation='secondary' onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name='delete-booking'>
          <ConfirmDelete
            resourceName='booking'
            disabled={deletingBooking === 'pending'}
            onConfirm={() =>
              deleteBooking(id, {
                onSettled: () => navigate(-1),
              })
            }
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
