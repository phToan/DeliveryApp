import { StyleSheet } from "react-native";
import color from "../../Assets/color"

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        alignItems: 'flex-end',
        backgroundColor: color.white
    },
    header_title: {
        color: color.black,
        fontSize: 22
    },
    body: {
        flex: 11,
        marginVertical: 5,
        backgroundColor: color.white
    },
    item: {
        height: 90,
        justifyContent: 'center',
        backgroundColor: color.base,
    },
    item_icon: {
        borderRadius: 100,
        backgroundColor: '#FEEBD0',
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginHorizontal: 15
    },
    item_title: {
        fontWeight: 'bold'
    },
    item_separator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c8c8c8',
        marginLeft: 60
    }
})