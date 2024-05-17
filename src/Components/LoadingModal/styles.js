import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(00,00,00,.5)', //trong suot 50%
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    component: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        height: '12%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    header: {
        paddingBottom: 15,
    },
    body: {},
    footer: {
        width: '30%',
        backgroundColor: 'orange',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
    },
});
