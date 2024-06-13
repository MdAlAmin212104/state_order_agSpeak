import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Stack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hook/useAxios';
import useData from '../hook/useData';

const SaleOrderForm = ({ isOpen, onClose, saleOrder }) => {
  const axiosPublic = useAxios();
  const [, refetch] = useData();

  const { data: singleData = {} } = useQuery({
    queryKey: ['saleOrder', saleOrder?._id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/orders/${saleOrder._id}`);
      return res.data;
    },
    enabled: !!saleOrder?._id
  });

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      customer_name: '',
      price: '',
      last_modified: '',
      amount: ''
    }
  });

  useEffect(() => {
    if (singleData) {
      setValue('customer_name', singleData.customer_name);
      setValue('price', singleData.price);
      setValue('amount', singleData.amount);
      setValue('last_modified', singleData.last_modified);
    }
  }, [singleData, setValue]);

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(singleData._id);
    const productInformation = {
      ...data,
      _id : singleData._id,
    }
    console.log(productInformation);
    axiosPublic.put(`/orders`, productInformation)
      .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0 ){
          alert('updated order successfully');
          refetch();
        }
      })
    onClose();
  };

  const isReadOnly = singleData.status === 'paid';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{singleData ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Input {...register('customer_name')} placeholder="Customer Name" isReadOnly={isReadOnly} />
              <Input {...register('price')} placeholder="Price" isReadOnly={isReadOnly} />
              <Input {...register('amount')} placeholder="Amount" isReadOnly={isReadOnly} />
              <Controller
                name="last_modified"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    placeholderText="Select date"
                    dateFormat="yyyy-MM-dd"
                    readOnly={isReadOnly}
                  />
                )}
              />
              {!isReadOnly && (
                <Button type="submit" colorScheme="teal">
                  {saleOrder ? 'Update' : 'Create'}
                </Button>
              )}
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
