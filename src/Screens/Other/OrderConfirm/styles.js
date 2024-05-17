import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'darkorange',
        height: 80,
        alignItems: 'flex-end',
    },
    footer: {
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        // flex: 1,
        height: 50,
    },
    _footer_payment: {
        flex: 2,
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginTop: 3,
    },
    b_order: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
    },
    route: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
    },
    b_route: {
        borderWidth: 0.5,
        padding: 5,
        borderColor: 'red',
    },
    _route_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    order: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    detail_order: {
        borderWidth: 0.5,
        borderColor: 'orange',
        padding: 10,
        marginTop: 5,
    },
    method: {
        marginTop: 10,
        backgroundColor: '#effaf9',
        padding: 10,
    },
    t_method: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#189893',
    },
    express: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        borderBottomColor: 'orange',
        borderBottomWidth: 0.5,
    },
    save: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    point: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    payment: {
        marginTop: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    _payment_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sender: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.5,
        marginTop: 10,
        borderRadius: 5,
        flex: 1,
    },
    underline: {
        textDecorationLine: 'underline',
        color: 'red',
    },
    distance: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    distance_title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    distance_number: {
        color: 'green',
        fontWeight: '500',
        fontSize: 16,
    },
    infor: {
        marginHorizontal: 10,
        flex: 9,
    },
    infor_title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2299ba',
        marginBottom: 5,
    },
    infor_address: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 3,
    },
    infor_blank: {
        color: 'blue',
        fontWeight: '500',
    },
    star: {
        color: 'red',
        fontSize: 16,
    },
    infor_order_title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infor_order: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    infor_order_main: {
        fontSize: 15,
        marginHorizontal: 10,
    },
    point_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    point_main: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    payment_title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    deli_fee: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    total_payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    total_title: {
        fontSize: 15,
        fontWeight: '500',
        marginVertical: 3,
    },
    footer_payment: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer_order: {
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
    },
});
