import { View, Text, SafeAreaView, ScrollView, Linking } from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import AppContext from '../../../Context/AppContext';
import { styles } from './styles';
import { instance } from '../../../Api/instance';
import { Status } from './components/status';
import { inforSender as Infor } from '../../../Components/OrderConfirm';
import { InforDriver } from './components/inforDriver';
import { Header } from '../../../Components/Header';
import { DetailTime } from './components/detailTime';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import { getDatabase, off, onValue, ref, remove } from 'firebase/database';
import { TextFont } from '../../../Components/Text';
import color from '../../../Assets/color';
import { Map } from '../../../Components/MapView';
import firebaseDB from '../../../../firebaseConfig'

const Detail = ({ route, navigation }) => {
  const { socket } = React.useContext(AppContext);
  const [driver, setDriver] = React.useState(null);
  const [coordinate, setCoordinate] = useState([])
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const item = route?.params.data;
  const database = getDatabase();
  const dataRef = ref(database, `order/${item?.key}`);
  const onClickExit = () => {
    navigation.goBack();
  };
  const data = {
    id: item.id,
    status: 4,
  };
  const fetchDriver = async () => {
    await instance
      .get('/driver/user', {
        params: { id: item?.driver?.id ?? 0 },
      })
      .then((res) => {
        setDriver(res.data.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
   const handleCoordinate = (dataString) => {
    let dataArray = dataString.split(',');
    let result = [];
    for (let i = 0; i < dataArray.length; i += 2) {
      let longitude = parseFloat(dataArray[i]);
      let latitude = parseFloat(dataArray[i + 1]);
      result.push({ longitude, latitude });  
    }
    return result
   }
  let isCoordinateSet = false;
  // const getCoordinate = () => {
  //   const database = getDatabase();
  //   const dataRef = ref(database, 'active_status/-NxHZyoo6_DBEuOX4jIh');
  //   const onDataChange = (snapshot) => {
  //     const newData = snapshot.val() ?? [];
  //     // const arr = Object.values(newData);
  //     console.log('arr: ', newData.lat);
  //     !isCoordinateSet && (setCoordinate(handleCoordinate(newData.routing)), isCoordinateSet = true),
  //     setCoordinate(handleCoordinate(newData.routing))
  //     setLat(newData.lat),
  //     setLong(newData.long)
  //   };
  //   onValue(dataRef, onDataChange);
  // };

  useEffect(() => {
    fetchDriver();
  }, []);

  useEffect(() => {
    const database = getDatabase(firebaseDB);
    const dataRef = ref(database, 'active_status/-NxGCeokxml6zb4Dow4b');
    const onDataChange = (snapshot) => {
      const newData = snapshot.val() ?? [];
      const arr = Object.values(newData);
      console.log('newData: ',newData)
      !isCoordinateSet && newData?.routing && (
        console.log('abcbcb'),
        setCoordinate(handleCoordinate(newData.routing)), 
        isCoordinateSet = true
      ),
      newData && (
        setLat(newData.lat),
        setLong(newData.long)
      )
    };
    const unsubscribe = onValue(dataRef, onDataChange);
    // return () => {
    //     off(dataRef, onDataChange);
    //     unsubscribe();
    // };
  }, [])
  // const onClickDel = async () => {
  //    await instance.put('/order/customer', data)
  //       .then((res) => {
  //          if (res.data.err == 0) {
  //             navigation.navigate('Đã hủy')
  //             if (socket) {
  //                socket.emit('customer-cancle-order', {})
  //             }
  //          }
  //       })
  //       .catch(err => {
  //          console.log(err)
  //       })

  // }
  const onClickDel = async () => {
    remove(dataRef)
      .then(() => {
        console.log('Key deletion successful');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Key deletion failed:', error); // Xử lý lỗi nếu xoá khóa không thành công
      });
  };

  const onClickPhone = async () => {
    const isAvailable = await Linking.canOpenURL(`tel:${driver.phone}`);
    if (isAvailable) {
      Linking.openURL(`tel:${driver.phone}`);
    } else {
      console.log(
        'Ứng dụng gọi điện thoại không khả dụng trên thiết bị.'
      );
    }
  };
  const size_order = item.size_item;
  const detail_order = item.detail_item;

  console.log('coordinate: ',coordinate);

  return (
    <SafeAreaView style={styles.component}>
      <Header onClickReturn={onClickExit} title="Chi tiết đơn hàng" />
      <View style={styles.body}>
        <ScrollView>
          <View style={styles._body_status}>
            <Status item={item} status={route?.params.status} />
          </View>
          {driver && (
            <InforDriver
              driver={driver}
              onPress={onClickPhone}
              id={item?.driver?.id}
            />
          )}

          {route?.params.status === 2 && coordinate.length > 0 && (
            <View style={styles.map_view}>
              <Map 
                coordinates={coordinate}
                lat={lat ?? coordinate[0].latitude}
                lng={ long ?? coordinate[0].longitude}
                delta={0.01}
                coordinatesEnd={coordinate[coordinate.length - 1]}
              />
            </View>
          )}

          <View style={styles._body_delivery}>
            <View style={{ flexDirection: 'row' }}>
              <Icon1
                name={'truck-check'}
                size={20}
                color={'orange'}
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: '500' }}
                >
                  Thông tin vận chuyển
                </Text>
                <Text
                  style={{ color: '#3c3c38', marginTop: 5 }}
                >
                  Giao hàng{' '}
                  {item.infor_shipping == 1
                    ? 'hỏa tốc'
                    : 'tiết kiệm'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.distance}>
            <View style={{ flexDirection: 'row' }}>
              <Icon1
                name={'map-marker-distance'}
                color={'darkorange'}
                size={22}
              />
              <Text style={styles.t_distance}>
                Quãng đường:{' '}
                <Text style={{ color: 'blue' }}>
                  {item.distance} km
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Infor
              iconColor={'#2299ba'}
              iconName={'location-pin'}
              title={'người gửi'}
              name={item?.sender_name ?? item?.senderInfo?.name}
              address={
                item?.sender_address ??
                item?.senderInfo?.address
              }
              phone={item.sender_phone ?? item?.senderInfo?.phone}
              onPress={null}
            />
            <Infor
              iconColor={'red'}
              iconName={'my-location'}
              title={'người nhận'}
              name={
                item?.receiver_name ?? item?.receiverInfo?.name
              }
              address={
                item?.receiver_address ??
                item?.receiverInfo?.address
              }
              phone={
                item?.receiver_phone ??
                item?.receiverInfo?.phone
              }
              onPress={null}
            />
          </View>
          <View style={styles.order}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Icon1
                name={'calendar-text-outline'}
                size={23}
                color={'orange'}
              />
              <Text style={styles.t_order}>
                Chi tiết đơn hàng
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                marginHorizontal: 5,
                borderColor: 'silver',
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ color: '#3c3c38' }}>
                Kích thước đơn:{' '}
                {size_order == 1 ? 'Cồng kềnh' : 'Nhỏ gọn'}
              </Text>
              {(detail_order !== '' ||
                item?.detail_item !== '') && (
                  <Text
                    style={{ color: '#3c3c38', marginTop: 4 }}
                  >
                    Thông tin đơn:{' '}
                    {detail_order ?? item?.detail_item}
                  </Text>
                )}
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 10,
              padding: 10,
            }}
          >
            <View style={styles.payment}>
              <TextFont
                title={'Phí giao hàng: '}
                fs={16}
                fw={'500'}
              />
              <Text style={styles.t_payment}>
                <TextFont
                  title={'đ'}
                  underline
                  color={color.red}
                />
                {item.transportFee}
              </Text>
            </View>
            {item?.COD && (
              <View style={styles.payment}>
                <TextFont title={'COD: '} fs={16} fw={'500'} />
                <Text style={styles.t_payment}>
                  <TextFont
                    title={'đ'}
                    underline
                    color={color.red}
                  />
                  {item.COD}
                </Text>
              </View>
            )}
            <View style={styles.payment}>
              <Text style={styles.t_payment}>Thanh toán: </Text>
              <Text style={styles.t_payment}>
                <TextFont
                  title={'đ'}
                  underline
                  color={color.red}
                />
                {item.price}
              </Text>
            </View>
          </View>

          <DetailTime item={item} />
        </ScrollView>
      </View>

      {route?.params.status == 1 && (
        <ButtonConfirm
          footerStyle={styles.footer}
          onPress={onClickDel}
          title={'Hủy đơn hàng'}
          validate={true}
        />
      )}
    </SafeAreaView>
  );
};

export default Detail;
