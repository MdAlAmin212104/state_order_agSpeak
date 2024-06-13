import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Button, Input, Stack, useDisclosure } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SaleOrderTable from '../components/SaleOrderTable';
import useData from '../hook/useData';
import useAxios from '../hook/useAxios';
import useAuth from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';

const convertToISO = (dateString) => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  return isoString;
}

const OrderPage = () => {
  const { user } = useAuth();
  const [products] = useData();
  const paid = products.filter((active) => active.status === 'paid');
  const pending = products.filter((active) => active.status === 'pending');
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    const isoDate = convertToISO(new Date());
    const ProductInfo = {
      customer_name: data.customer_name,
      price: parseInt(data.price),
      last_modified: isoDate,
      amount: parseInt(data.amount),
      status: 'pending'
    };
    axiosPublic.post('/orders', ProductInfo)
      .then(res => {
        if (res.data.insertedId) {
          alert('Product added successfully');
        }
      })
      .catch(error => console.error(error));
    onClose();
    reset();
  };

  return (
    <div>
      <div className="flex justify-end items-center -mb-4 mt-4">
        <Button onClick={onOpen} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </Button>
      </div>
      <Tabs className="-mt-6">
        <TabList>
          <Tab>Active Orders</Tab>
          <Tab>Completed Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SaleOrderTable orders={pending} />
          </TabPanel>
          <TabPanel>
            <SaleOrderTable orders={paid} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Add New Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Input {...register('customer_name')} placeholder="Customer Name" />
                <Input {...register('price')} placeholder="Price" />
                <Input {...register('amount')} placeholder="Amount" />
                <Controller
                  name="invoice_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      placeholderText="Select date"
                      dateFormat="yyyy-MM-dd"
                    />
                  )}
                />
                <Button type="submit" colorScheme="teal">
                  {'Create'}
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrderPage;
