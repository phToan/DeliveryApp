import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        // backgroundColor: 'rgba(00,00,00,.5)', //trong suot 50%
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    body: {
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 10,
        flex: 5
    },
    validate: {
        color: 'red',
        marginTop: 5
    },
    map: {
        flex: 1.2,
        width: '100%',
        backgroundColor: 'blue'
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        padding: 20
    },
    message_body: {
        textAlign: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    bt_ok: {
        borderRadius: 40,
        paddingVertical: 15,
        marginHorizontal: 20
    },
    bt_title: {
        fontSize: 18,
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold'
    },
    label_title: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        marginBottom: 10
    },
    footer: {
        flex: 0.8,
        justifyContent: 'center'
    },

})