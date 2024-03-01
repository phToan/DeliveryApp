import React, { useState } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native'
import color from '../../Assets/color'
import Icon from 'react-native-vector-icons/Fontisto'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import ItemUser from './components/itemUser'
import { USER_ACCOUNT } from '../../Constants/NameScreen'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { GradientColor } from './components/linearGradient'
import { ItemMain } from './components/itemMain'
import { ItemLogout } from './components/itemLogout'
import { Header } from './components/header'

const User = ({ navigation }) => {
   const infor = useSelector((state) => state.userInforSlice)
   const [account, setAccount] = useState('0')
   if (infor.gender) {
      imageSource = require('../../Assets/Image/man_icon.jpg')
   } else {
      imageSource = require('../../Assets/Image/girl_icon.jpg')
   }

   const onClickMyAccount = () => {

   }
   const onClickPointNumber = () => {

   }
   const onClickUserAccount = () => {
      navigation.navigate(USER_ACCOUNT)
   }
   const onClickLogOut = () => {
      navigation.popToTop()
   }

   return (
      <ScrollView>
         <SafeAreaView style={{
            flex: 1
         }}>
            <Header infor={infor} onPress={onClickUserAccount} />

            <View style={styles._header_member} onPress={onClickPointNumber}>
               <GradientColor style={styles.background} x1={0} x2={80} y1={0} y2={100} />
               <ItemMain
                  unit={'điểm'}
                  infor={infor.point}
                  label={'Thành viên'}
                  colorIcon={'green'}
                  nameIcon={'card-membership'}
                  onPress={null}
                  style={styles.itemMember} />
            </View>

            <ItemMain
               colorIcon={'orange'}
               infor={account}
               label={'Tài khoản của tôi'}
               nameIcon={'account-balance-wallet'}
               onPress={onClickMyAccount}
               style={styles.account}
               unit={'đ'} />

            <View style={{ marginTop: 20 }}>
               <ItemUser
                  iconName='location-sharp'
                  title='Địa điểm đã lưu'
                  onPress={null}
                  colorIcon='blue' />
               <ItemUser
                  iconName='ios-gift'
                  title='Ưu đãi'
                  onPress={null}
                  colorIcon='orange' />
               <ItemUser
                  iconName='heart'
                  title='Tài xế yêu thích'
                  onPress={null}
                  colorIcon='red' />
               <ItemUser
                  iconName='settings-sharp'
                  title='Cài đặt'
                  onPress={null}
                  colorIcon='silver' />
            </View>

            <ItemLogout onPress={onClickLogOut} />

            <TouchableOpacity style={styles.footer}>
               <ImageBackground
                  source={require('../../Assets/Image/rate.jpg')}
                  style={styles.imageBackground}
               />
            </TouchableOpacity>
         </SafeAreaView>
      </ScrollView>
   )
}

export default User

