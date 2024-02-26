import { StyleSheet } from "react-native";
import color from "../../../Assets/color";
export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        // backgroundColor: 'rgba(00,00,00,.5)', //trong suot 50%
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    body: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: 'center',
    },
    map: {
        height: '15%',
        width: '100%',
        backgroundColor: 'blue'
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    message_body: {
        fontSize: 16,
        textAlign: 'center'
    },
    bt_ok: {
        width: '100%',
        backgroundColor: color.orange,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 15
    },
    bt_title: {
        fontSize: 18,
        color: "white"
    }
})