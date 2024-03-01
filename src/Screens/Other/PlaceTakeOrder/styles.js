import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: 'flex-end',
        borderBottomWidth: 0.2,
        borderColor: 'orange',
        paddingBottom: 15
    },
    t_header: {
        flex: 7,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    body: {
        flex: 14,
        backgroundColor: 'white',
        marginTop: 10
    },
    footer: {
        backgroundColor: 'white',
        flex: 1.2,
        justifyContent: 'center',
        padding: 10,
        marginTop: 5
    },
    b_confirm: {
        backgroundColor: '#ff6e23',
        flex: 1,
        justifyContent: 'center'
    },
    t_address: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    address: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    map: {
        height: 150,
        backgroundColor: 'blue',
        marginTop: 10,
        borderColor: 'darkorange',
        borderWidth: 0.5
    },
    _body_address: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    b_change: {
        backgroundColor: '#fff0db',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        paddingVertical: 8
    },
    t_change: {
        fontSize: 16,
        color: '#ff6833',
        fontWeight: 'bold'
    },
    _body_sender: {
        marginTop: 10,
        height: 180,
        backgroundColor: 'white',
        padding: 10
    },
    t_infor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    textInput: {
        marginTop: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    _input_pass: {
        marginTop: 15,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    t_confirm: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
})