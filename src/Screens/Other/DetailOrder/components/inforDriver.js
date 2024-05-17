import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '../../../../Assets/icon';
import { TextFont } from '../../../../Components/Text';
import { getDatabase, onValue, ref } from 'firebase/database';
const styles = StyleSheet.create({
    driver: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
    },
    label_driver: {
        flexDirection: 'row',
    },
    inforDriver: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phone: {
        marginTop: 3,
        textDecorationLine: 'underline',
        // color: 'red'
        fontSize: 15,
    },
    icon: {
        borderWidth: 0.5,
        padding: 10,
        marginTop: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
});

export const InforDriver = ({ onPress, driver, id }) => {
    const [avatar, setAvatar] = useState('');
    const getKey = () => {
        const database = getDatabase();
        const dataRef = ref(database, 'avatar/driver');
        const onDataChange = (snapshot) => {
            const newData = snapshot.val() ?? [];
            const arr = Object.values(newData);
            arr.filter((item) => {
                console.log(item);
                item?.id === id &&
                    (setAvatar(item?.avatar), console.log(item?.avatar));
            });
        };
        onValue(dataRef, onDataChange);
    };
    useEffect(() => {
        getKey();
    }, []);
    console.log('id: ', id);
    return (
        <View>
            {id !== 0 && (
                <View style={styles.driver}>
                    <View style={styles.label_driver}>
                        <FontAwesome5 name="house-user" size={20} />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '500',
                                marginLeft: 5,
                            }}
                        >
                            Thông tin tài xế
                        </Text>
                    </View>
                    <View style={styles.inforDriver}>
                        {/* <FontAwesome5
                            name="user-alt"
                            size={50}
                            style={styles.icon}
                            color={'silver'}
                        /> */}
                        {avatar && (
                            <Image
                                source={{
                                    uri: avatar,
                                }}
                                style={styles.avatar}
                            />
                        )}
                        <View style={{ marginLeft: 10 }}>
                            <TextFont
                                title={`Họ tên: ${driver.name}`}
                                mt={5}
                                fs={16}
                            />
                            <TextFont
                                title={`Năm sinh: ${driver.dob}`}
                                mt={3}
                                fs={16}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <TextFont
                                    title={'Số điện thoại: '}
                                    mt={4}
                                    fs={16}
                                />
                                <TouchableOpacity onPress={onPress}>
                                    <TextFont
                                        title={driver.phone}
                                        mt={3}
                                        fs={16}
                                        underline
                                    />
                                </TouchableOpacity>
                            </View>
                            <TextFont
                                title={`Số xe: ${driver.vehicle_num}`}
                                mt={3}
                                fs={16}
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};
