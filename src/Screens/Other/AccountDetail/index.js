import React, { useEffect, useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import AppContext from '../../../Context/AppContext'
import * as NameScreen from '../../../Constants/NameScreen'
import { FieldInfor, FieldLabel } from './components/fieldInfor';
import { Header } from '../../../Components/Header';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../Api/getToken';
import { getData } from '../../../Api/api_query';

const UserAccount = ({ navigation }) => {
    const infor = useSelector((state) => state.userInforSlice)
    // const { isUpdate, setUpdate } = useContext(AppContext)
    const dispatch = useDispatch()
    const onClickReturn = () => {
        navigation.navigate('Tài khoản')
    }
    const data = {
        name: infor.name,
        dob: infor.dob,
        phone: infor.phone,
        gender: infor.gender,
        id: infor.id
    }
    const onClickChangePass = () => {
        navigation.navigate(NameScreen.EDIT_PASSWORD, { id: infor.id })
        // setUpdate(false)
    }
    const onClickChangeInforUser = () => {
        navigation.navigate(NameScreen.EDIT_PROFILE, { data })
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             if (isUpdate) {
    //                 await getToken()
    //                 await getData(dispatch)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    // }, [isUpdate])

    return (
        <SafeAreaView>
            <Header onClickReturn={onClickReturn} title='Tài khoản của tôi' />
            <View style={styles.body}>
                <FieldLabel
                    labelStyle={styles.labelItem}
                    onPress={onClickChangeInforUser}
                    label={'Thông tin cá nhân'} />
                <FieldInfor infor={infor.name} label={'Họ và tên'} />
                <FieldInfor infor={infor.dob} label={'Ngày sinh'} />
                <FieldInfor infor={infor.phone} label={'Số điện thoại'} />
                <FieldLabel
                    labelStyle={styles.textItem}
                    onPress={onClickChangePass}
                    label={'Password'} />
            </View>
        </SafeAreaView>
    )
}

export default UserAccount

