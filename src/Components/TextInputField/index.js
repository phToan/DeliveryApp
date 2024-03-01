import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    body: {
        marginTop: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 5,
        height: 55
    },
    tranform: {
        transform: [{ translateX: 10 }, { translateY: -15 }]
    },
    label: {
        fontSize: 14,
        backgroundColor: 'white',
        paddingHorizontal: 3
    }
})

export const InputField = ({
    name,
    onChangeText,
    focus,
    onFocus,
    onBlur,
    disable,
    label
}) => (
    <View style={styles.body}>
        {focus && <View style={[{ flexDirection: 'row' }, styles.tranform]}>
            <Text style={styles.label}>{label}</Text>
        </View>}
        <TextInput
            style={{ fontSize: 16, bottom: focus ? 9 : 0 }}
            defaultValue={name}
            placeholderTextColor={'black'}
            placeholder={focus ? '' : label}
            onChangeText={(text) => onChangeText(text)}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={disable}
        />
    </View>
)