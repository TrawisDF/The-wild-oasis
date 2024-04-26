import styled from 'styled-components';

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  // duplicate
  //useMu
  const { status: createStatus, createCabin } = useCreateCabin();
  const { status: deleteStatus, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  return (
    <Table.Row role='row'>
      <Img src={image} alt='' />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={createStatus === 'pending'} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens='edit'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens='confirm-delete'>
            <button disabled={deleteStatus === 'pending'}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name='confirm-delete'>
            <ConfirmDelete
              resourceName='cabins'
              disabled={deleteStatus === 'pending'}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
