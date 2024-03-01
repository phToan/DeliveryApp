import { StyleSheet } from "react-native"
import color from "../../../Assets/color"
export const styles = StyleSheet.create({
    separatorView: {
        height: 0.5,
        backgroundColor: '#c8c8c8',
        marginLeft: 40
    },
    container_item: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    location_icon_item: {
        padding: 3,
        backgroundColor: '#d3dad7',
        marginHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    header: {
        height: 55,
        backgroundColor: color.base,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.2,
        borderColor: 'orange'
    },
    title_header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    input_search: {
        flexDirection: 'row',
        height: 55,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderColor: 'orange',
        alignItems: 'center',
        marginTop: 10
    },
    bt_select_location_on_map: {
        height: 65,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon_select_location_on_map: {
        marginHorizontal: 10,
        backgroundColor: '#f9dbca',
        marginVertical: 15,
        padding: 3
    },
    title_select_location_on_map: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'darkorange'
    },
    bt_select_current_location: {
        height: 65,
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon_select_current_location: {
        flex: 1,
        alignItems: 'center',
    },
    body_saved_location: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginHorizontal: 10,
        borderBottomWidth: 0.5
    },
    container_saved_location: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 110
    },
    bt_add_location: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

})