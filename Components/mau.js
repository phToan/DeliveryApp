import React, { useState, useEffect, Component } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RNSVGDefs } from 'react-native-svg'
import { io } from 'socket.io-client'

// export default class Mau extends Component{
//     constructor(props){
//         super(props)
//         this.socket = io("http://192.168.1.228:3000", {jsonp:false})
//     }
//     render(){
//         var let =4
//         // return(
//             // <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
//             //     <Text>okfffffffffffff</Text>
//             // </View>
//         // )
//     }
// }



