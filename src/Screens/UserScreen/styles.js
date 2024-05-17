import { StyleSheet } from 'react-native';
import color from '../../Assets/color';

export const styles = StyleSheet.create({
    _header_user: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    _header_member: {
        height: 60,
        justifyContent: 'center',
    },
    iconRight: {
        marginRight: 25,
    },
    iconReact: {
        marginLeft: 15,
    },
    t_point: {
        marginLeft: 145,
        marginRight: 10,
    },
    t_member: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 25,
    },
    t_money: {
        marginLeft: 130,
        marginRight: 15,
    },
    account: {
        width: '100%',
        height: 60,
        backgroundColor: color.base,
        paddingVertical: 20,
        marginTop: 20,
        flexDirection: 'row',
    },
    t_account: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 20,
    },
    logout: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.white,
        paddingVertical: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    itemMember: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    footer: {
        height: 170,
        marginTop: 30,
        marginHorizontal: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 60 / 2,
        borderWidth: 1,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    ImageImoji: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    ImageImoji1: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
    },
    ImageColor: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    imageBackground: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});
