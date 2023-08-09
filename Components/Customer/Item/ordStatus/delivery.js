import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, FlatList, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AppContext from '../../../Context/AppContext'

const Delivery = ({route}) =>{
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const { socket, reload, setReload } = useContext(AppContext)
    const [delID, setDelID] = useState('')
 
    useEffect(() => {
       socket.on('orderTaken', (value) => {
          const dataDriver = JSON.parse(value)
          console.log(dataDriver.name)
          // const newItem = data.filter((item)=> item.id === dataDriver.id)
          // const newData = data.filter((item)=> item.id !== dataDriver.id)
          // if (newItem !== undefined) {
          //    setData2((preItem) => [...preItem, newItem])
          // }
          // setData(newData)
          // setValue('2')
       })
    }, [])
 
    useEffect(() => {
       if (route?.params?.delItem) {
          const { id } = route.params.delItem
          setDelID(id)
          console.log(delID)
          const newData = data.filter((item) => item.id !== delID)
          setData(newData)
 
       }
       // if (reload) {
       //    navigation.reset({
       //       index: 0,
       //       routes: [{ name: 'BottomTab' }],
       //    })
       //    // navigation.navigate('BottomTab',{screen:'Đơn hàng'})
       //    setReload(false)
       // }
       // navigation.reset({
       //    index: 1,
       //    routes: [{ name: 'BottomTab' }],
       // })
    }, [route?.params?.delItem])
 
    useEffect(() => {
       if (route?.params?.myOrder) {
          setData((preItem) => [...preItem, route?.params?.myOrder])
          console.log('1')
       }
    }, [route?.params?.myOrder])
 
    const itemView = ({ item }) => {
       return (
          <TouchableOpacity
             onPress={() => getItem(item)}
             style={{
                height: 90,
                justifyContent: 'center',
                backgroundColor: '#FEEBD0',
             }}>
             <View style={{
                flexDirection: 'row',
             }}>
                <View style={{
                   borderRadius: 100,
                   backgroundColor: '#FEEBD0',
                   justifyContent: 'center',
                   alignItems: 'center',
                   flex: 1
                }}>
                   {!item.expressShip ? <Icon name='speedometer' size={25} color={'darkorange'} />
                      : <Icon1 name='rocket' size={25} color={'darkorange'} />}
                </View>
                <View style={{ flex: 6 }}>
                   <Text style={{
                      fontWeight: 'bold'
                   }}> {item.recieverName}</Text>
                   <Text>{item.recieverAddress}</Text>
                   <Text>{item.price}</Text>
                </View>
             </View>
          </TouchableOpacity>
       )
    }
    const getItem = (item) => {
       navigation.navigate('detailOrder', { newItem: item })
    }
 
    const separatorView = () => {
       return (
          <View style={{
             height: 1,
             width: '100%',
             backgroundColor: '#c8c8c8',
          }} />
       )
    }
 
    return (
       <SafeAreaView style={{ flex: 1,backgroundColor:'#f7f8fa' }}>
             {data.length === 0 ? (
                <View style={{
                   alignItems: 'center'
                }}>
                   <Image source={require('../../../../Contains/Image/101.jpg')} style={styles.image101} />
                   <Text style={styles.text1}>Chưa có đơn hàng ở trạng thái này</Text>
                </View>
             ) : (
                <FlatList
                   data={data}
                   renderItem={itemView}
                   keyExtractor={item => item.id}
                   ItemSeparatorComponent={separatorView}
                />
             )}
 
 
       </SafeAreaView>
    )
}

export default Delivery

const styles = StyleSheet.create({
    image101: {
       width: 250,
       height: 250,
       marginTop: 70,
       marginBottom: 20
    },
    text1: {
       fontSize: 16,
       fontWeight: 'bold'
    },
    text2: {
       fontSize: 16,
       textAlign: 'center',
       marginHorizontal: 20,
       marginTop: 10
    }
 })