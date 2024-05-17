import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
    header: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 7,
        flexDirection: 'row',
    },
    label_driver: {
        flexDirection: 'row',
    },
    icon: {
        borderWidth: 0.5,
        padding: 10,
        marginTop: 10,
    },
    driver: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
        // flexDirection: 'row'
    },
    inforDriver: {
        // marginLeft: 10,
        flexDirection: 'row',
    },
    body: {
        flex: 15,
        marginTop: 1,
    },
    footer: {
        flex: 1.2,
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        justifyContent: 'center',
    },
    _footer_inside: {
        backgroundColor: '#ec5e09',
        height: 45,
        justifyContent: 'center',
    },
    t_header: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 6,
        textAlign: 'center',
    },
    phone: {
        marginTop: 3,
        textDecorationLine: 'underline',
        // color: 'red',
        fontSize: 15,
    },
    t_evaluate: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    _body_status: {
        // height: 90,
        paddingVertical: 10,
        backgroundColor: '#26ab9a',
        // backgroundColor:'white',
        // alignItems: 'center',
        paddingHorizontal: 10,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 5,
    },
    t_status: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    _body_delivery: {
        backgroundColor: 'white',
        padding: 10,
    },
    distance: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    t_distance: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10,
    },
    order: {
        backgroundColor: 'white',
        marginTop: 10,
        // padding: 10
    },
    t_order: {
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 10,
    },
    payment: {
        backgroundColor: 'white',
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    t_payment: {
        fontSize: 16,
        fontWeight: '500',
    },
    id_order: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
    },
    _id_order_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
