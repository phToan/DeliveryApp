import { StyleSheet } from "react-native";
import color from "../../Assets/color";

export const styles = StyleSheet.create({
    header: {
        resizeMode: 'stretch',
        width: '100%',
        height: 250
    },
    t_header: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 40,
        color: color.orange,
        fontWeight: 'bold'
    },
    validate: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5
    },
    _input: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5,
        borderBottomWidth: 0.5,
        padding: 8,
        alignItems: 'center',
    },
    footer: {
        marginHorizontal: 120,
        marginTop: 20,
        marginBottom: 120
    },
    image: {
        width: 50,
        height: 50,
        marginHorizontal: 10
    },
    icon: {
        marginTop: 50,
        alignItems: 'center',
    },
    b_login: {
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginVertical: 5,
        marginHorizontal: 50
    },
    TextInput: {
        width: '80%',
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 16,
    },
    t_forgot_pass: {
        fontSize: 16,
        marginVertical: 10,
        color: color.orange,
        textAlign: 'center'
    },
    t_or: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    other_login: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        marginHorizontal: 80,
        justifyContent: 'center'
    },
    t_question: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
    },
    textMessage: {
        color: color.red,
        marginHorizontal: 40
    },
})