import { getDatabase, ref, push, set, get } from 'firebase/database';
import firebaseDB from '../../firebaseConfig';

const initOrderItem = (item) => {
    console.log(item);
    const db = getDatabase(firebaseDB);
    const newData = push(ref(db, 'order'));

    set(newData, {
        id: Date.now().toString(),
        senderInfo: {
            name: item?.sender_name,
            phone: item?.sender_phone,
            address: item?.sender_address,
            subAddress: item?.sender_detail_address,
            note: item?.noteSender ?? '',
        },
        receiverInfo: {
            name: item?.receiver_name,
            phone: item?.receiver_phone,
            address: item?.receiver_address,
            subAddress: item?.receiver_detail_address,
            note: item?.noteReceiver ?? '',
        },
        size_item: item?.size_item,
        detail_item: item?.detail_item,
        info_shipping: item?.infor_shipping,
        distance: item?.distance,
        price: item?.price,
        customer_id: item?.customer_id,
        shipCode: item?.shipCode ?? '',
        driver: {
            id: 0,
            onReceive: '',
            onTaken: '',
            onSuccess: '',
            onFailure: '',
            status: 0,
        },
    })
        .then((res) => {
            console.log('res: ', res);
        })
        .catch((err) => {
            console.log(('err: ', err));
        });
};

export const createOrder = async (item) => {
    await initOrderItem(item);
};
