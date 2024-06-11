
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useData = () => {
    const axiosPublic = useAxios()

    const { data: products = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/orders`);
            return res.data;
        },
    });
    return [products];
};

export default useData;