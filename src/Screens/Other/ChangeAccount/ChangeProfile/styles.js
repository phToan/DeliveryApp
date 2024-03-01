import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    component: {
        flex: 1,
    },

    t_header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    _image: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    body: {
        marginTop: 5,
        backgroundColor: 'white',
        padding: 10,
        flex: 8
    },
    _body_dob: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        height: 55
    },
    footer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        marginTop: 5
    },
    textInput: {
        marginTop: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 5,
        height: 55
    },
    avatar: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    t_update: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    }
})