import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { Map } from '../../../Components/MapView';
import { useDispatch, useSelector } from 'react-redux';
import {
    senderAddress,
    latitude as senderLat,
    longitude as senderLng,
} from '../../../Redux/Reducers/senderSlice';
import {
    receiverAddress,
    latitude as receiverLat,
    longitude as receiverLng,
} from '../../../Redux/Reducers/receiverSlice';
import { ItemSearchAddress } from '../../../Components/ItemSearchAddress';
import { ItemSeparatorView } from '../../../Components/itemSeparator';
import { styles } from './styles';
import { ButtonConfirm } from '../../../Components/ButtonConfirm';
import { AntDesign, Entypo } from '../../../Assets/icon';
import { GetCurrentLocation } from '../../../Components/getCurrentLocate';
import { instanceAutoComplete, instanceCoord } from '../../../Api/instance';

const SetAddressSender = ({ navigation, route }) => {
    const { id, latitude, longitude, address } = route.params;
    const [searchTerm, setSearchTerm] = useState(address);
    const [predictions, setPredictions] = useState([]);
    const [lat, setLat] = useState(latitude);
    const [lng, setLng] = useState(longitude);
    const [locate, setLocate] = useState(address);
    const currentLocate = useSelector(
        (state) => state.currentLocateSlice.initialState
    );
    const dispatch = useDispatch();
    const handleSearch = async (text) => {
        setSearchTerm(text);
        try {
            const response = await instanceAutoComplete.get(`${text}`);
            const data = await response.data;
            if (data.predictions) {
                setPredictions(data.predictions);
            }
            if (text.length == 0) {
                setPredictions([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClickConfirm = async () => {
        if (id == 1) {
            dispatch(senderAddress(locate));
            dispatch(senderLat(lat));
            dispatch(senderLng(lng));
        } else {
            dispatch(receiverAddress(locate));
            dispatch(receiverLat(lat));
            dispatch(receiverLng(lng));
        }
        navigation.goBack();
    };

    const onClickReturn = () => {
        navigation.goBack();
    };

    const onPressCurrentLocate = () => {
        if (id == 1) {
            dispatch(senderAddress(currentLocate?.address));
            dispatch(senderLat(currentLocate?.latitude));
            dispatch(senderLng(currentLocate?.longitude));
        } else {
            dispatch(receiverAddress(currentLocate?.address));
            dispatch(receiverLat(currentLocate?.latitude));
            dispatch(receiverLng(currentLocate?.longitude));
        }
        navigation.goBack();
    };

    const onClickItem = async (item) => {
        setSearchTerm(item.description);
        setPredictions([]);
        try {
            const itemLocate = item.description;
            const response = await instanceCoord.get(`${itemLocate}`);
            const data = response.data;
            console.log(data);
            if (data.status === 'OK' && data.results.length > 0) {
                setLocate(data.results[0].formatted_address);
                console.log(address);
                const location = data.results[0].geometry.location;
                setLat(location.lat);
                setLng(location.lng);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleSearchText = () => {
        setSearchTerm('');
        setPredictions([]);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={onClickReturn}>
                    <Icon name="arrowleft" size={25} />
                </TouchableOpacity>
                <View style={styles.textInput}>
                    <TextInput
                        style={{
                            width: searchTerm.length > 0 ? '92%' : '100%',
                        }}
                        numberOfLines={1}
                        onChangeText={handleSearch}
                        value={searchTerm}
                        placeholder="Tìm kiếm ở đây"
                        placeholderTextColor={'black'}
                    />
                    {searchTerm.length > 0 && (
                        <TouchableOpacity
                            style={styles.icon_del}
                            onPress={handleSearchText}
                        >
                            <AntDesign
                                name="closecircle"
                                size={20}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <GetCurrentLocation
                address={currentLocate.address}
                onPress={onPressCurrentLocate}
            />

            <View style={styles.map}>
                <View style={styles.flatlist}>
                    <FlatList
                        data={predictions}
                        renderItem={({ item }) => (
                            <ItemSearchAddress
                                item={item}
                                onPress={onClickItem}
                            />
                        )}
                        keyExtractor={(item) => item.place_id}
                        ItemSeparatorComponent={() => <ItemSeparatorView />}
                    />
                </View>

                <Map lat={parseFloat(lat)} lng={parseFloat(lng)} delta={0.01} />
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickConfirm}
                title={'Xác nhận'}
                validate={true}
            />
        </SafeAreaView>
    );
};

export default SetAddressSender;
