import SaleOrderTable from "../components/SaleOrderTable";
import useData from "../hook/useData";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const OrderPage = () => {
  const [products] = useData();
  console.log(products);
  const paid = products.filter((active) => active.status == "paid");
  const pending = products.filter((active) => active.status == "pending");

  return (
    <div>
      <div className="flex justify-end items-center -mb-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add product
        </button>
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
    </div>
  );
};

export default OrderPage;
