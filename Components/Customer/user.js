import React, { useState } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native'
import color from '../../Contains/color'
import Icon from 'react-native-vector-icons/Fontisto'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
import ItemUser from './Item/user/itemUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SysModal from '../SysModal/sys_modal'
import axios from 'axios'
import AppContext from '../Context/AppContext'

const User = ({navigation}) => {
    // const navigation = useNavigation()
    const [point, setPoint] = useState('')
    const [account, setAccount] = useState('0')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState(null)
    const {isUpdate, setUpdate, returnSocket} = React.useContext(AppContext)


    const getData = async () => {
        setName(await AsyncStorage.getItem('name'))
        setPhone(await AsyncStorage.getItem('phone'))
        setGender(await AsyncStorage.getItem('gender'))
        setPoint(await AsyncStorage.getItem('point'))
    }

    const getToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refresh_token')
        const data = {
            refresh_token: refreshToken
        }
        await axios.post('http://192.168.1.229:5000/customer/refresh_token', data)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    // console.log(await AsyncStorage.getItem('access_token'))
                } else if (res.data.err == 2) {
                    // setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
                    // setShowModal(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getDatabase = async () => {
        const accessToken = await AsyncStorage.getItem('access_token')
        const data = {
            headers: {
                'Authorization': accessToken
            }
        }
        await axios.get('http://192.168.1.229:5000/customer', data)
            .then(async (res) => {
                await AsyncStorage.setItem('name', res.data.userData.name)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (isUpdate) {
                    await getToken()
                    await getDatabase()
                    await getData()
                    setUpdate(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [isUpdate])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await getData()
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    },[])

    if (gender) {
        imageSource = require('../../Contains/Image/man_icon.jpg')
    } else {
        imageSource = require('../../Contains/Image/girl_icon.jpg')
    }

    const onClickMyAccount = () => {

    }
    const onClickPointNumber = () => {

    }
    const onClickUserAccount = () => {
        navigation.navigate('userAccount')
    }
    const onClickLogOut = () => {
        returnSocket()
        navigation.popToTop()
    }


    return (
        <ScrollView>
            <SafeAreaView style={{
                flex: 1
            }}>
                <View style={{ height: 130 }}>
                    <Svg style={styles.background}>
                        <Defs>
                            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="20%">
                                <Stop offset="0%" stopColor="rgb(255,242,161)" />
                                <Stop offset="35%" stopColor="rgba(255,248,211,1)" />
                                <Stop offset="100%" stopColor="rgba(229,251,255,1)" />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#gradient)" />
                    </Svg>
                    {/* <View style={{ height: 40 }} /> */}
                    <TouchableOpacity style={styles._header_user} onPress={onClickUserAccount}>
                        <View style={styles.image}>
                            <Image source={imageSource} style={styles.avatar} />
                        </View>
                        <View style={{
                            marginHorizontal: 10,
                            flex: 10,
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                            <Text>{phone}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Icon name='angle-right' size={18} color={color.silver} />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles._header_member} onPress={onClickPointNumber}>
                    <Svg style={styles.background}>
                        <Defs>
                            <LinearGradient id="gradient" x2="80%" y1="0%" x1="0%" y2="100%">
                                <Stop offset="0%" stopColor="rgb(255,242,161)" />
                                <Stop offset="35%" stopColor="rgba(255,248,211,1)" />
                                <Stop offset="100%" stopColor="rgba(229,251,255,1)" />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#gradient)" />
                    </Svg>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Icon1 name='logo-react' size={20} color={color.blue} style={styles.iconReact} />
                        <Text style={styles.t_member}>Thành viên</Text>
                        <Text style={styles.t_point}>{point} điểm</Text>
                        <Icon name='angle-right' size={18} color={color.silver} style={styles.iconRight} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.account} onPress={onClickMyAccount}>
                    <Icon2 name='money-check' size={20} color={'orange'} style={styles.iconReact} />
                    <Text style={styles.t_account}>Tài khoản của tôi</Text>
                    <Text style={styles.t_money}>{account} đ</Text>
                    <Icon name='angle-right' size={18} color={color.silver} style={styles.iconRight} />
                </TouchableOpacity>

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity>
                        <ItemUser iconName='location-sharp' title='Địa điểm đã lưu' colorIcon='blue' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ItemUser iconName='ios-gift' title='Ưu đãi' colorIcon='orange' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ItemUser iconName='heart' title='Tài xế yêu thích' colorIcon='red' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ItemUser iconName='settings-sharp' title='Cài đặt' colorIcon='silver' />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logout} onPress={onClickLogOut}>
                    <View style={{ flex: 1, alignItems:'center' }}>
                        <Icon1 name='log-out' size={25} color={'orange'} />
                    </View>
                    <View style={{ flex: 4}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red',textAlign:'center' }}>Đăng xuất</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footer}>
                    <ImageBackground
                        source={require('../../Contains/Image/rate.jpg')}
                        style={styles.imageBackground}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

export default User

const styles = StyleSheet.create({
    _header_user: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40
    },
    _header_member: {
        height: 60,
        justifyContent: 'center',
    },
    iconRight: {
        marginRight: 25
    },
    iconReact: {
        marginLeft: 15
    },
    t_point: {
        marginLeft: 145,
        marginRight: 10
    },
    t_member: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 25
    },
    t_money: {
        marginLeft: 130,
        marginRight: 15
    },
    account: {
        width: '100%',
        height: 60,
        backgroundColor: color.base,
        paddingVertical: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    t_account: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20
    },
    image: {
        borderRadius: 100,
        padding: 10,
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.white,
        paddingVertical: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    footer:{
        height: 170,
        marginTop: 30,
        marginHorizontal: 15,
    },
    avatar: {
        width: 50,
        height: 30,
        resizeMode: 'contain',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    ImageImoji: {
        width: "100%",
        height: '100%',
        resizeMode: 'contain'
    },
    ImageImoji1: {
        width: "100%",
        height: '90%',
        resizeMode: 'contain'
    },
    ImageColor: {
        width: "100%",
        height: '100%',
        resizeMode: 'contain'
    },
    imageBackground: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: 365,
        height: '100%',
        borderRadius: 20
    },
})