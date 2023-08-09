import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'


const AddAddress = () => {
   const route = useRoute();
   const navigation = useNavigation()
   const [namePlace, setNamePlace] = useState('')
   const [detailedAddress, setDetailAddress] = useState('')
   const [phoneReceiver, setPhoneReciever] = useState('')
   const [nameReceiver, setNameReciever] = useState('')
   const [address, setAddress] = useState('Địa chỉ')
   const onClickReturn = () => {
      navigation.navigate('savedPlace')   
   }
   

   const onClickSetAddress = () =>{

   }
   const savedPlace = () => {
      navigation.navigate('savedPlace')
   }
   const validSavedPlace =() => namePlace.length > 0 && address === 'Địa chỉ'
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
               <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Thêm địa điểm thân quen</Text>
            </View>
            <View style={{ flex: 1 }} />
         </View>
        
         <View style={{
            marginTop: 3,
            backgroundColor: 'white',
            paddingHorizontal:10,
            paddingBottom:15
         }}>
            <View style={styles.textInput}>
               <TextInput
                  style={{}}
                  placeholder='Tên địa điểm'
                  placeholderTextColor={'black'}
                  onChangeText={(text) => {
                     setNamePlace(text)
                  }}
               />
            </View>
            <TouchableOpacity style={{
               borderWidth:1,
               padding:15,
               borderRadius:10,
               marginTop:15
            }} onPress={onClickSetAddress}>
               <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                  <Text>{address}</Text>
                  <Icon name='right' size={18} color={'black'}/>
               </View>
            </TouchableOpacity>
            <View style={styles.textInput}>
               <TextInput
                  style={{}}
                  placeholder='Chi tiết địa chỉ (không bắt buôc)'
                  placeholderTextColor={'black'}
                  onChangeText={(text) => {
                     setDetailAddress(text)
                  }}
               />
            </View>
         </View>
         <View style={{
            marginTop:10,
            backgroundColor:'white',
            paddingHorizontal:10,
            paddingBottom:15
         }}>
            <View style={styles.textInput}>
               <TextInput
                  style={{}}
                  placeholder='Tên liên lạc (không bắt buôc)'
                  placeholderTextColor={'black'}
                  onChangeText={(text) => {
                     setNameReciever(text)
                  }}
               />
            </View>
            <View style={styles.textInput}>
               <TextInput
                  style={{}}
                  placeholder='Số điện thoại (không bắt buôc)'
                  placeholderTextColor={'black'}
                  onChangeText={(text) => {
                     setPhoneReciever(text)
                  }}
               />
            </View>
         </View>
         <View style={{
            backgroundColor:'white',
            paddingVertical:16,
            marginTop:340,
            height:80
         }}>
            <TouchableOpacity style={{
               backgroundColor: validSavedPlace() ? '#ff5b18' : 'silver',
               padding:12,
               marginHorizontal:15,
               borderRadius:5,
               
            }} activeOpacity={0.9} onPress={savedPlace} disabled={!validSavedPlace()}>
               
               <Text style={{fontSize:16, color:'white',fontWeight:'bold', textAlign:'center'}}>Lưu địa điểm</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default AddAddress

const styles = StyleSheet.create({
   textInput: {
      marginTop: 15,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal:15,
      borderRadius: 10,
  },
})