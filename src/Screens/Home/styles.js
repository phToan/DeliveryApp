import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    container: {
        flex: 1
    },
    header: {
        flex: 0.5,
        backgroundColor: '#f58439',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingHorizontal: 10
    },
    main: {
        flex: 10
    },
    swiper: {
        height: 250,
        backgroundColor: '#f58439',
        paddingVertical: 10
    },
    body: {
        marginVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: 15
    },
    body_title: {
        flexDirection: 'row',
        marginTop: 5
    },
    t_title: {
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    origin_address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    origin_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    t_origin: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 15
    },
    t_origin_address: {
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 10
    },
    destination_address: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        borderRadius: 10
    },
    destination_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    map: {
        height: 500,
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 5,
    },
    map_title: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 15,
        marginHorizontal: 15
    },
    map_view: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
        backgroundColor: 'base',
        height: 450
    }
})