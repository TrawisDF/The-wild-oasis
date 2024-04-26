import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabins() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new a Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal((prev) => !prev)}>
//           <CreateCabinForm onClose={() => setIsOpenModal((prev) => !prev)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
