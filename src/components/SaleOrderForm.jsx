import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Stack } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderForm = ({ isOpen, onClose, saleOrder }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: saleOrder || { customer_id: '', items: [], paid: false, invoice_no: '', invoice_date: '' },
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{saleOrder ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Input {...register('customer_id')} placeholder="Customer Name" />
              <Input {...register('invoice_no')} placeholder="Price" />
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
              <Button type="submit" colorScheme="teal">{saleOrder ? 'Update' : 'Create'}</Button>
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>{saleOrder ? 'Update' : 'Create'}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
