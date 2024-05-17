import React, { useState, useEffect } from 'react';
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
    onChildAdded,
    onChildRemoved,
} from 'firebase/database';

const Waiting = ({ navigation }) => {
    const id = useSelector((state) => state.userInforSlice.id);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    const payload = {
        customer_id: id,
        status: 1,
    };

    // const getData = async () => {
    //     const data = await fetchData(payload);
    //     setData(data);
    // };

    useEffect(() => {
        if (isFocused) {
            const database = getDatabase();
            const dataRef = ref(database, 'order');
            const onDataChange = (snapshot) => {
                // setOrderSelected([]);
                const newData = snapshot.val() ?? [];
                const arr = Object.values(newData);
                // const arrItem = arr.filter(
                //     (item) => item?.driver?.id === 0 || item?.driver?.id === 1
                // );
                let arrData = [];
                const keys = Object.keys(snapshot.val() ?? []);
                // arrItem.map((e, index) => {
                //     e.key = keys[index];
                //     arrData.unshift(e);
                //     e.driver.status > 0 &&
                //         e.driver.id === 1 &&
                //         (setOrderSelected((prev) => [...prev, e]),
                //         setIsOrderSelected(true),
                //         (arrData = arrData.filter((item) => item.id !== e.id)));
                // });
                arr.map((e, index) => {
                    e.key = keys[index];
                    e.driver.status <= 1 && arrData.unshift(e);
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

    // useEffect(() => {
    //     if (isFocused) {
    //         getData();
    //     }
    // }, [isFocused]);

    const getItem = (item) => {
        navigation.navigate(DETAIL_ORDER, {
            data: item,
            status: 1,
        });
    };

    return <ListOrder data={data} onPress={getItem} />;
};

export default Waiting;
