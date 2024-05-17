import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GradientColor } from './linearGradient';
import color from '../../../Assets/color';
import { Fontisto } from '../../../Assets/icon';

export const Header = ({ infor, onPress }) => {
    let imageSource;
    if (infor.gender) {
        imageSource = require('../../../Assets/Image/man_icon.jpg');
    } else {
        imageSource = require('../../../Assets/Image/girl_icon.jpg');
    }
    return (
        <View style={{ height: 130 }}>
            <GradientColor
                style={styles.background}
                x1={0}
                x2={100}
                y1={0}
                y2={20}
            />
            <TouchableOpacity style={styles._header_user} onPress={onPress}>
                <Image source={imageSource} style={styles.avatar} />
                <View style={styles.infor}>
                    <Text style={styles.name}>{infor.name}</Text>
                    <Text>{infor.phone}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Fontisto
                        name="angle-right"
                        size={18}
                        color={color.silver}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    infor: {
        marginHorizontal: 10,
        flex: 10,
    },
    _header_user: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 70 / 2,
        borderWidth: 0.3,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
