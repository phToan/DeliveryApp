import React, { useState, useEffect, useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { DETAIL_ORDER } from '../../../Constants/NameScreen';
import { ListOrder } from '../../../Components/ListOrder';
import { fetchData } from '../helper';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import {
    getDatabase,
    onValue,
    off,
    ref,
    remove,
    onChildAdded,
    onChildRemoved,
} from 'firebase/database';
import { instance } from '../../../Api/instance';

const Delivery = ({ navigation }) => {
    const id = useSelector((state) => state.userInforSlice.id);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const database = getDatabase();

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    const payload = {
        customer_id: id,
        status: 2,
    };

    // const getData = async () => {
    //     const data = await fetchData(payload);
    //     setData(data);
    // };

    // useEffect(() => {
    //     if (isFocused) {
    //         getData();
    //     }
    // }, [isFocused]);

    useEffect(() => {
        if (isFocused) {
            const database = getDatabase();
            const dataRef = ref(database, 'order');
            const onDataChange = (snapshot) => {
                const newData = snapshot.val();
                const arr = Object.values(newData ?? []);
                let arrData = [];
                const keys = Object.keys(snapshot.val() ?? []);
                arr.map((e, index) => {
                    e?.driver?.status === 2 && arrData.unshift(e);
                    e?.driver?.status === 3 &&
                        (saveData(
                            {
                                id: e?.id,
                                sender_name: e?.senderInfo?.name,
                                sender_phone: e?.senderInfo?.phone,
                                sender_address: e?.senderInfo?.address,
                                sender_detail_address:
                                    e?.senderInfo?.subAddress,
                                receiver_name: e?.receiverInfo?.name,
                                receiver_phone: e?.receiverInfo?.phone,
                                receiver_address: e?.receiverInfo?.address,
                                receiver_detail_address:
                                    e?.receiverInfo?.subAddress,
                                size_item: e?.size_item,
                                detail_item: e?.detail_item,
                                infor_shipping: e?.info_shipping,
                                distance: e?.distance,
                                price: e?.price,
                                customer_id: e?.customer_id,
                                status: 3,
                                driver_id: e?.driver?.id,
                                confirm_order_at: e?.driver?.onSuccess,
                            },
                            keys[index]
                        ),
                        console.log('abc'));
                });
                setData(arrData);
            };
            const unsubscribe = onValue(dataRef, onDataChange);

            // Lắng nghe sự kiện khi một trường được xóa đi
            const onRemoved = onChildRemoved(dataRef, (snapshot) => {
                const removedFieldId = snapshot.key;
                console.log(`Trường với ID ${removedFieldId} đã bị xóa.`);
            });
            return () => {
                off(dataRef, onDataChange);
                unsubscribe();
                onRemoved();
            };
        }
    }, [isFocused]);

    const saveData = useCallback(async (myOrder, key) => {
        console.log('key: ', key);
        const dataRef = ref(database, `order/${key}`);
        await instance
            .post('/order/customer', myOrder)
            .then((res) => {
                if (res.data.err == 0) {
                    const updateData = {
                        status: 5,
                    };
                    update(dataRef, updateData)
                        .then(() => {
                            navigation.navigate('Đơn hàng', {
                                screen: 'Đã giao',
                            });
                            console.log('update success');
                        })
                        .catch((e) => {
                            console.log('err: ', e);
                        });
                }
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    }, []);

    const getItem = (item) => {
        navigation.navigate(DETAIL_ORDER, {
            data: item,
            status: 2,
        });
    };

    return <ListOrder data={data} onPress={getItem} />;
};

export default Delivery;
