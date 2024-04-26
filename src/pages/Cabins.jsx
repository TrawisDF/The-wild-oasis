import AddCabins from '../features/cabins/AddCabins';
import CabinTable from '../features/cabins/CabinTable';
import CabinTableOperation from '../features/cabins/CabinTableOperation';
import Filter from '../ui/Filter';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperation />
      </Row>
      <Row>
        <CabinTable />
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
