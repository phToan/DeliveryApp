import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AppContext from '../../../Context/AppContext';
import { useContext } from 'react';
import { CHANGE_ADDRESS } from '../../../Constants/NameScreen';
import { Map } from '../../../Components/MapView';
import { useDispatch, useSelector } from 'react-redux';
import {
    senderName,
    senderPhone,
    senderAddress,
} from '../../../Redux/Reducers/senderSlice';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import { styles } from './styles';
import { Header } from '../../../Components/Header';
import { InputField } from '../../../Components/TextInputField';
import { validatePhone } from '../../../Helper/validate';

const DetailedAddress = ({ navigation }) => {
    const { setAddress } = useContext(AppContext);
    const senderInfo = useSelector((state) => state.senderSlice);
    const [nameSender, setNameSender] = useState(senderInfo.name);
    const [phoneSender, setPhoneSender] = useState(senderInfo.phone);
    const dispatch = useDispatch();

    const onClickReturn = () => {
        navigation.navigate('Trang chủ');
    };
    const onClickChageAddress = () => {
        navigation.navigate(CHANGE_ADDRESS, {
            id: 1,
            latitude: senderInfo.latitude,
            longitude: senderInfo.longitude,
            address: addressDetail,
        });
    };
    const onClickConfirm = async () => {
        setAddress(addressDetail);
        navigation.navigate('Trang chủ');
        dispatch(senderName(nameSender));
        dispatch(senderPhone(phoneSender));
        dispatch(senderAddress(addressDetail));
    };

    const onChangeText = (text) => {
        setPhoneSender(text);
    };

    const validate =
        validatePhone(phoneSender) == null &&
        phoneSender.length > 0 &&
        nameSender.length > 0;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                onClickReturn={onClickReturn}
                title={'Thông tin lấy hàng'}
            />
            <View style={styles.body}>
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ borderBottomWidth: 0.2 }}>
                            <Text style={styles.t_address}>Lấy hàng tại</Text>
                        </View>
                        <View style={styles.map}>
                            <Map
                                lat={parseFloat(senderInfo.latitude)}
                                lng={parseFloat(senderInfo.longitude)}
                                delta={0.003}
                            />
                        </View>
                        <View style={styles._body_address}>
                            <View style={{ flex: 3 }}>
                                <Text style={styles.address}>
                                    {senderInfo.address}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.b_change}
                                onPress={onClickChageAddress}
                            >
                                <Text style={styles.t_change}>Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles._body_sender}>
                        <Text style={styles.t_infor}>Thông tin người gửi</Text>
                        <InputField
                            disable={true}
                            label={'Họ và tên'}
                            name={nameSender}
                            onChangeText={(text) => setNameSender(text)}
                            validate={true}
                        />
                        <InputField
                            disable={true}
                            label={'Số điện thoại'}
                            name={phoneSender}
                            onChangeText={onChangeText}
                            validate={validatePhone(phoneSender) == null}
                        />
                        {validatePhone(phoneSender) != null && (
                            <Text style={styles.validate}>
                                Số điện thoại chưa hợp lệ
                            </Text>
                        )}
                    </View>
                </ScrollView>
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickConfirm}
                title={'Xác nhận'}
                validate={validate}
            />
        </SafeAreaView>
    );
};

export default DetailedAddress;
