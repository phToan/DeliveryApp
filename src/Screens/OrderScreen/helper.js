import { instance } from "../../Api/instance";
export const fetchData = async (payload) => {
    try {
        const response = await instance.get('/order/customer', { params: payload })
        return response.data.data.rows;
    } catch (error) {
        console.error(error);
    }
};