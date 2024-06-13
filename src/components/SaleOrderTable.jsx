import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import SaleOrderForm from './SaleOrderForm';

const SaleOrderTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Table variant="simple">
      <Thead>
          <Tr>
            <Th>Customer ID</Th>
            <Th>Customer Name</Th>
            <Th>price</Th>
            <Th>Last Modified</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, idx) => (
            <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{order.customer_name}</Td>
                <Td>{order.price}</Td>
                <Td>{order.last_modified}</Td>
                <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => openModal(order)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isModalOpen && (
        <SaleOrderForm
          isOpen={isModalOpen}
          onClose={closeModal}
          saleOrder={selectedOrder}
        />
      )}
    </Box>
  );
};

export default SaleOrderTable;
