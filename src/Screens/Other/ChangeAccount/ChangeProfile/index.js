import React, { useState, useContext } from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import SysModal from '../../../../Components/Modal/SysModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import AppContext from '../../../../Context/AppContext'
import { getData, updateData } from '../../../../Api/api_query'
import { getToken } from '../../../../Api/getToken'
import { useDispatch } from 'react-redux'
import { Header } from '../../../../Components/Header/index'
import { InputField } from '../../../../Components/TextInputField'
import { DobField } from '../../../../Components/TextInputField/dobField'
import { ButtonConfirm } from '../../../../Components/ButtonConfirm/index'
import { styles } from './styles'

const EditProfile = ({ route, navigation }) => {
   const { setUpdate } = useContext(AppContext)
   const [nameUser, setNameUser] = useState(route?.params.data.name)
   const [dateOfBirth, setDateOfBirth] = useState(route?.params.data.dob)
   const [date, setDate] = useState(new Date())
   const [showModal, setShowModal] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [isSuccess, setIsSuccess] = useState(false)
   const dispatch = useDispatch()
   const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateOfBirth(currentDate.toLocaleDateString('en-GB'))
   };
   const showMode = (currentMode) => {
      DateTimePickerAndroid.open({
         value: date,
         onChange,
         mode: currentMode,
         is24Hour: true,
      });
   }
   const onClickCalendar = () => {
      showMode('date')
   }
   const onClickUpdate = async () => {
      if (nameUser !== '' && nameUser !== route.params.data.name) {
         data['name'] = nameUser
      }
      if (dateOfBirth !== '' && dateOfBirth !== route.params.data.dob) {
         data['dob'] = dateOfBirth
      }
      if (Object.keys(data).length > 1) {
         await update(data)
      } else {
         setErrorMessage('Vui lòng thay đổi thông tin cá nhân trước khi cập nhật')
         setShowModal(true)
      }
   }

   const onClickReturn = () => {
      navigation.goBack()
   }

   const data = {
      id: route.params.data.id
   }

   const getAccessToken = async () => {
      const data = await getToken()
      if (data.err == 0) {
         await AsyncStorage.setItem('access_token', data.access_token)
      } else if (data.err == 2) {
         setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
         setShowModal(true)
      }
   }

   const update = async () => {
      const status = await updateData(data)
      if (status == 0) {
         await getAccessToken()
         await getData(dispatch)
         setIsSuccess(true)
         setErrorMessage('Cập nhật thông tin thành công')
         setShowModal(true)
      } else {
         setErrorMessage('Cập nhật thông tin thất bại')
         setShowModal(true)
      }
   }

   const onHideModal = () => {
      if (isSuccess) {
         setUpdate(true)
         setIsSuccess(false)
         setShowModal(false)
         navigation.goBack()
      } else {
         setShowModal(false)
      }
   }

   if (route?.params.data.gender) {
      imageSource = require('../../../../Assets/Image/man_icon.jpg')
   } else {
      imageSource = require('../../../../Assets/Image/girl_icon.jpg')
   }

   const handleName = (text) => {
      setNameUser(text)
      const words = text.split(' ')
      const formattedText = words
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ')
      setNameUser(formattedText)
   }
   return (
      <SafeAreaView style={styles.component}>
         <SysModal onHide={onHideModal} Visible={showModal} Message={errorMessage} />
         <Header onClickReturn={onClickReturn} title='Chỉnh sửa hồ sơ' />
         <View style={styles.body}>
            <View style={styles._image}>
               <Image source={imageSource} style={styles.avatar} />
            </View>
            <InputField
               name={nameUser}
               onChangeText={handleName}
               disable={true}
               label={'Họ Tên'}
               validate={true}
            />
            <DobField
               dob={dateOfBirth}
               onClickCalendar={onClickCalendar}
            />
            <InputField
               name={route.params.data.phone}
               onChangeText={null}
               disable={false}
               label={'Số điện thoại'}
               validate={true}
            />
         </View>
         <ButtonConfirm
            footerStyle={styles.footer}
            onPress={onClickUpdate}
            title={'Cập nhật'}
            validate={true}
         />
      </SafeAreaView>
   )
}

export default EditProfile

