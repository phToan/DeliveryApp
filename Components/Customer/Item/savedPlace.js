import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'



const SavedAddress = () => {
   const [nullItem, setNullItem] = useState(true)
   const navigation = useNavigation()
   const route = useRoute()
   // const {fromPage} = route.params
   const onClickReturn = () => {
      navigation.navigate('placeDelivery' )
   }
   const onClickAddAddress = () => {
      navigation.navigate('addPlace')
   }
   let ViewDetail
   if (nullItem) {
      ViewDetail = (
         <View style={{ backgroundColor: 'white',height:1000 }}>
            <View style={{
               marginTop: 40,
               width: '100%',
               height: 400,
               justifyContent: 'flex-end',
               alignItems: 'center'
            }}>
               <Image source={require('../../../Contains/Image/nullitem1.jpg')} style={styles.image} />
            </View>
            <View style={{alignItems:'center'}}>
               <Text style={{ fontSize:22, fontWeight:'bold' }}>Bạn có địa chỉ nào thân quen?</Text>
               <Text style={{marginTop:20, marginHorizontal:20, textAlign:'center'}}>Bắt đầu lưu giữ những địa điểm quen thuộc của mình để lần sau đặt đơn nhanh hơn nhé!</Text>
            </View>
            <TouchableOpacity style={{
               flexDirection:'row', 
               backgroundColor:'#ff5b18',
               marginHorizontal:90,
               marginTop:30,
               paddingVertical:12,
               borderRadius:10,
               justifyContent:'center'
            }} onPress={onClickAddAddress}>
               <Icon name='pluscircle' color={'white'} size={20}/>
               <Text style={{marginHorizontal:10,color:'white',fontWeight:'bold'}}>Thêm địa chỉ</Text>
            </TouchableOpacity>
         </View>
      )
   }
   return (
      <SafeAreaView>
         <View style={{

            backgroundColor: 'white',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 40,
            paddingBottom: 20
         }}>
            <TouchableOpacity onPress={onClickReturn} style={{ flex: 1, alignItems: 'center' }}>
               <Icon name='arrowleft' color={'black'} size={25} />
            </TouchableOpacity>
            <View style={{ flex: 7, alignItems: 'center', }}>
               <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Địa điểm đã lưu</Text>
            </View>
            <View style={{ flex: 1 }} />
         </View>
         {ViewDetail}

      </SafeAreaView>
   )
}

export default SavedAddress

const styles = StyleSheet.create({
   image: {
      width: '80%',
      height: '80%'
   },
})