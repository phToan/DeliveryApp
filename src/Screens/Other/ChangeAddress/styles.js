import { StyleSheet } from "react-native";
import color from "../../../Assets/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        height: 100,
        alignItems: 'flex-end',
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flex: 8,
        marginHorizontal: 10,
        backgroundColor: '#f1f1f1',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        borderRadius: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: '2%',
        // marginLeft: 10
        flex: 1
    },
    flatlist: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    map: {
        flex: 8,
        marginVertical: 5,
        // borderRadius: 15,
        padding: 10,
        backgroundColor: 'white'
    },
    locate: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 50,
        borderRadius: 10
    },
    footer: {
        backgroundColor: 'white',
        paddingVertical: 13,
        flex: 1,
        justifyContent: 'center'
    },
    icon_locate: {
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'center'
    },
    t_locate: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 16
    },
    icon_del: {
        marginHorizontal: 5
    }

})