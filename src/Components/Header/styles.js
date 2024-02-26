import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'darkorange',
        height: 80,
        alignItems: 'flex-end'
    },
    icon: {
        flex: 1
    },
    title: {
        flex: 5,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
})