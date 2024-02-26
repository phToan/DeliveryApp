import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    component: {
        flex: 1
    },
    header: {
        height: 100,
        borderBottomWidth: .2,
        borderColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    text_header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'orange',
        textAlign: 'center'
    },
    icon_exit: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    },
    body: {
        flex: 1
    },
    footer: {
        marginHorizontal: 40,
        marginTop: 60,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 80,
    },
    itext1: {
        color: 'orange',
        // textDecorationLine: 'underline',
    },
    LabelView: {
        height: 50,
        width: 120,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LabelViewGender: {
        height: 50,
        width: 120,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    LabelTextView: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    TextInput: {
        // marginHorizontal: 10,
        fontSize: 16,
        width: '90%'
    },
    _input: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    _input_pass: {
        height: 50,
        marginTop: 20,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderWidth: 1,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        borderRadius: 10,
        alignItems: 'center'
    },
    _input_dob: {
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 10,
    },
    dropdown_gender: {
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
    },

})