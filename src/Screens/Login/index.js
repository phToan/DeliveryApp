import {
    View,
    SafeAreaView,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import color from '../../Assets/color';
import SysModal from '../../Components/Modal/SysModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import * as NameScreen from '../../Constants/NameScreen';
import { getData } from '../../Api/api_query';
import { instance } from '../../Api/instance';
import { getLocation } from '../../Api/getCurrentCoord';
import { validatePassword, validatePhone } from '../../Helper/validate';
import ToastManager, { Toast } from 'toastify-react-native';
import LoadingModal from '../../Components/LoadingModal';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('0335539676');
    const [password, setPassword] = useState('11111111');
    const [loading, setLoading] = useState(false);

    const onHideModal = () => {
        setShowModal(false);
    };

    const data = {
        phone: phoneNumber,
        password: password,
    };

    const onClickLogin = async () => {
        setLoading(true);
        await instance
            .post('/customer/login', data)
            .then(async (res) => {
                if (res.data.err == 0) {
                    console.log('data: ', res.data);
                    await AsyncStorage.setItem(
                        'access_token',
                        res?.data?.access_token
                    );
                    await AsyncStorage.setItem(
                        'refresh_token',
                        res?.data?.refresh_token
                    );
                    await getData(dispatch);
                    await getLocation(dispatch);
                    setLoading(false);
                    navigation.navigate(NameScreen.TAB_SCREEN);
                    setPassword('');
                    setHidePass(true);
                } else {
                    setLoading(false);
                    setErrorMessage(
                        'Đăng nhập thất bại. Số điện thoại hoặc mật khẩu không chính xác'
                    );
                    setShowModal(true);
                    setPassword('');
                    setHidePass(true);
                }
            })
            .catch((err) => {
                console.log('err: ', err);
                setLoading(false);
                Toast.warn('Đăng nhập không thành công', 'bottom');
            });
    };

    const onClickEye = () => {
        console.log('display password');
        setHidePass(!hidePass);
    };

    const onClickRegister = () => {
        navigation.navigate(NameScreen.REGISTER_SCREEN);
    };

    const isValidLogin = () =>
        phoneNumber.length > 0 &&
        password.length > 0 &&
        validatePhone(phoneNumber) == null &&
        validatePassword(password) == null;

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <ToastManager
                animationOut={'slideOutRight'}
                animationIn={'slideInLeft'}
                // width={'70%'}
                height={60}
                duration={2500}
                textStyle={{
                    fontSize: 14,
                    fontWeight: '500',
                }}
            />
            <LoadingModal visible={loading} />
            <SysModal
                onHide={onHideModal}
                Visible={showModal}
                Message={errorMessage}
            />
            <ScrollView>
                <Image
                    source={require('../../Assets/Image/ghn1.jpg')}
                    style={styles.header}
                />
                <Text style={styles.t_header}>ĐĂNG NHẬP</Text>

                <View
                    style={[
                        styles._input,
                        {
                            borderColor:
                                validatePhone(phoneNumber) == null
                                    ? color.black
                                    : color.red,
                        },
                    ]}
                >
                    <Icon name="user" color="lightslategray" size={30} />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.TextInput}
                        placeholder="Nhập số điện thoại"
                        placeholderTextColor={color.black}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                </View>
                {validatePhone(phoneNumber) != null && (
                    <Text style={styles.validate}>
                        Số điện thoại chưa hợp lệ
                    </Text>
                )}
                <View
                    style={[
                        styles._input,
                        {
                            borderColor:
                                validatePassword(password) == null
                                    ? color.black
                                    : color.red,
                        },
                    ]}
                >
                    <Icon name="lock" color="lightslategray" size={30} />
                    <TextInput
                        style={styles.TextInput}
                        secureTextEntry={hidePass ? true : false}
                        placeholder="Nhập mật khẩu"
                        placeholderTextColor={color.black}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={onClickEye}>
                        <Icon
                            name={hidePass ? 'eye-slash' : 'eye'}
                            color="lightslategray"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                {validatePassword(password) != null && (
                    <Text style={styles.validate}>
                        Mật khẩu phải có tối thiểu 8 ký tự
                    </Text>
                )}

                <TouchableOpacity>
                    <Text style={styles.t_forgot_pass}>Quên mật khẩu ?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.b_login,
                        {
                            backgroundColor:
                                isValidLogin() == true
                                    ? color.orange
                                    : color.silver,
                        },
                    ]}
                    activeOpacity={0.5}
                    onPress={onClickLogin}
                    disabled={isValidLogin() == false}
                >
                    <Text style={{ fontSize: 18, color: color.white }}>
                        ĐĂNG NHẬP
                    </Text>
                </TouchableOpacity>

                <Text style={styles.t_or}>Hoặc</Text>
                <View style={styles.other_login}>
                    <TouchableOpacity>
                        <View style={{ marginHorizontal: 10 }}>
                            <Icon2
                                name="facebook-with-circle"
                                size={47}
                                color={'blue'}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('../../Assets/Image/google.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.t_question}>
                    Bạn đã có tài khoản chưa ?
                </Text>

                <TouchableOpacity
                    style={styles.footer}
                    onPress={onClickRegister}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            color: color.orange,
                        }}
                    >
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
