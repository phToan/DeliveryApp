import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './styles';
import * as NameScreen from '../../Constants/NameScreen';
import { instance } from '../../Api/instance';
import { Header } from '../../Components/Header';
import { InputField } from '../../Components/TextInputField';
import { useGlobalContext } from '../../../GlobalContext';

const genderData = [
    { id: 1, label: 'Nam' },
    { id: 0, label: 'Nữ' },
];

const Register = () => {
    const { changeState } = useGlobalContext();
    const navigation = useNavigation();
    const [isValidPhone, setValidPhone] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [isName, setValidName] = useState(true);
    const [dateOfBirthday, setDateOfBirthday] = useState('Ngày sinh');
    const [gender, setGender] = useState();
    const [date, setDate] = useState(new Date());
    const [hidePass, setHidePass] = useState(true);
    const [hideRePass, setHideRePass] = useState(true);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isValidPass, setValidPass] = useState(true);
    const [isRePassword, setValidRePassword] = useState(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setDateOfBirthday(currentDate.toLocaleDateString('en-GB'));
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const onClickDOB = () => {
        // showMode('date');
        changeState('Thoong bao', 'abd');
    };
    const data = {
        name: name,
        phone: phoneNumber,
        dob: dateOfBirthday,
        gender: gender,
        password: password,
    };
    const onClickContinue = async () => {
        await instance
            .post('/customer/register', data)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem(
                        'refresh_token',
                        res.data.refresh_token
                    );
                    await AsyncStorage.setItem(
                        'access_token',
                        res.data.access_token
                    );
                    navigation.navigate(NameScreen.TAB_SCREEN);
                    await getDatabase();
                } else if (res.data.err == 1) {
                    ToastAndroid.show(
                        'Tài khoản đã tồn tại !',
                        ToastAndroid.LONG
                    );
                    navigation.popToTop();
                } else {
                    ToastAndroid.show(
                        'Đăng ký không thành công !',
                        ToastAndroid.LONG
                    );
                    navigation.popToTop();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDatabase = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const data = {
            headers: {
                Authorization: accessToken,
            },
        };
        await axios
            .get('https://delivery-server-s54c.onrender.com/customer', data)
            .then(async (res) => {
                await AsyncStorage.setItem(
                    'id',
                    res.data.userData.id.toString()
                );
                await AsyncStorage.setItem('name', res.data.userData.name);
                await AsyncStorage.setItem('dob', res.data.userData.dob);
                await AsyncStorage.setItem(
                    'gender',
                    JSON.stringify(res.data.userData.gender)
                );
                await AsyncStorage.setItem('phone', res.data.userData.phone);
                await AsyncStorage.setItem(
                    'point',
                    res.data.userData.point.toString()
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setLength = (text, setValid) => {
        if (text.length == 0) {
            setValid(true);
        }
    };
    const onClickEye = () => {
        setHidePass(!hidePass);
    };
    const onClickExit = () => {
        navigation.goBack();
    };
    const onClickEyeRePass = () => {
        setHideRePass(!hideRePass);
    };
    const verifyPassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        return true;
    };
    const verifyName = (password) => {
        if (password.length < 6) {
            return false;
        }
        return true;
    };
    const verifyRePassword = (rePassword) => {
        if (rePassword === password && password === rePassword) {
            return true;
        }
        return false;
    };
    const verifyPhone = (phone) => {
        let phoneNumberRegex =
            /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$/; // Biểu thức chính quy kiểm tra đầu số Việt Nam
        if (phoneNumberRegex.test(phone)) {
            return true;
        }
        return false;
    };
    const Validate = (isValue, err) => {
        if (!isValue) {
            return (
                <Text style={{ color: 'red', marginHorizontal: 20 }}>
                    {err}
                </Text>
            );
        }
    };
    const isValidRegisterUser = () =>
        name.length > 0 &&
        phoneNumber.length > 0 &&
        isValidPhone == true &&
        isName == true &&
        password.length > 0 &&
        rePassword.length > 0 &&
        isValidPass == true &&
        isRePassword == true;

    const label = (value, message) => {
        if (value.length > 0) {
            return (
                <Text style={{ fontSize: 12, color: '#34343b' }}>
                    {message}
                </Text>
            );
        }
        return null;
    };
    const labelDOB = (value, message) => {
        if (value !== 'Ngày sinh') {
            return (
                <Text style={{ fontSize: 12, color: '#34343b' }}>
                    {message}
                </Text>
            );
        }
        return null;
    };

    const textInput = (
        type,
        holder,
        value,
        setValue,
        verify,
        setVerify,
        setLength,
        isUpperCase,
        hidePass
    ) => {
        return (
            <TextInput
                keyboardType={type}
                style={styles.TextInput}
                placeholder={holder}
                secureTextEntry={hidePass}
                placeholderTextColor={'black'}
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                    const isvalid = verify(text);
                    isvalid ? setVerify(true) : setVerify(false);
                    setLength(text, setVerify);
                    if (isUpperCase) {
                        const words = text.split(' ');
                        const formattedText = words
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ');
                        setValue(formattedText);
                    }
                }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.component}>
            <Header onClickReturn={onClickExit} title="Đăng ký" />

            <View style={styles.body}>
                <ScrollView>
                    {/* <View
                        style={[
                            { borderColor: isName ? 'black' : 'red' },
                            styles._input,
                        ]}
                    >
                        {label(name, 'Họ và tên')}
                        {textInput(
                            'default',
                            'Họ và tên',
                            name,
                            setName,
                            verifyName,
                            setValidName,
                            setLength,
                            true,
                            false
                        )}
                    </View> */}
                    {Validate(isName, 'Vui lòng nhập ít nhất 6 ký tự')}

                    <InputField
                        disable={true}
                        label={'Họ và tên'}
                        name={name}
                        onChangeText={(text) => setName(text)}
                        validate={true}
                    />

                    <InputField
                        disable={true}
                        label={'Số điện thoại'}
                        name={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        validate={true}
                    />

                    {/* <View
                        style={[
                            styles._input,
                            {
                                borderColor: isValidPhone ? 'black' : 'red',
                            },
                        ]}
                    >
                        {label(phoneNumber, 'Số điện thoại')}
                        {textInput(
                            'numeric',
                            'Số điện thoại',
                            phoneNumber,
                            setPhoneNumber,
                            verifyPhone,
                            setValidPhone,
                            setLength,
                            false,
                            false
                        )}
                    </View> */}
                    {Validate(
                        isValidPhone,
                        'Vui lòng nhập số điện thoại hợp lệ'
                    )}

                    <View style={styles._input_dob}>
                        <View>
                            {labelDOB(dateOfBirthday, 'Năm sinh')}
                            <Text style={{ fontSize: 16 }}>
                                {dateOfBirthday}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onClickDOB}>
                            <Icon name="calendar" size={30} color={'orange'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dropdown_gender}>
                        <Dropdown
                            style={{ width: '100%' }}
                            placeholderStyle={{
                                fontSize: 16,
                                marginHorizontal: 10,
                            }}
                            selectedTextStyle={{
                                fontSize: 16,
                                marginHorizontal: 10,
                            }}
                            data={genderData}
                            labelField="label"
                            valueField="id"
                            placeholder={'Giới tính'}
                            onChange={(item) => {
                                setGender(item.id);
                            }}
                        />
                    </View>

                    <View
                        style={[
                            styles._input_pass,
                            { borderColor: isValidPass ? 'black' : 'red' },
                        ]}
                    >
                        <View style={{ width: '90%' }}>
                            {label(password, 'Mật khẩu')}
                            {textInput(
                                'default',
                                'Nhập mật khẩu',
                                password,
                                setPassword,
                                verifyPassword,
                                setValidPass,
                                setLength,
                                false,
                                hidePass ? true : false
                            )}
                        </View>
                        <TouchableOpacity onPress={onClickEye}>
                            <Icon
                                name={hidePass ? 'eye-slash' : 'eye'}
                                color="lightslategray"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    {Validate(isValidPass, 'Vui lòng nhập ít nhất 8 ký tự')}
                    <View
                        style={[
                            styles._input_pass,
                            { borderColor: isRePassword ? 'black' : 'red' },
                        ]}
                    >
                        <View style={{ width: '90%' }}>
                            {label(rePassword, 'Nhập lại mật khẩu')}
                            {textInput(
                                'default',
                                'Nhập lại mật khẩu',
                                rePassword,
                                setRePassword,
                                verifyRePassword,
                                setValidRePassword,
                                setLength,
                                false,
                                hideRePass ? true : false
                            )}
                        </View>
                        <TouchableOpacity onPress={onClickEyeRePass}>
                            <Icon
                                name={hideRePass ? 'eye-slash' : 'eye'}
                                color="lightslategray"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    {Validate(isRePassword, 'Mật khẩu chưa trùng khớp')}

                    <TouchableOpacity
                        style={[
                            styles.footer,
                            {
                                backgroundColor:
                                    isValidRegisterUser() == true
                                        ? 'orange'
                                        : 'silver',
                            },
                        ]}
                        activeOpacity={0.5}
                        onPress={onClickContinue}
                        disabled={isValidRegisterUser() == false}
                    >
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            ĐĂNG KÝ
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Register;
