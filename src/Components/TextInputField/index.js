import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 5,
        height: 55,
    },
    tranform: {
        transform: [{ translateX: 10 }, { translateY: -15 }],
    },
    label: {
        fontSize: 14,
        backgroundColor: 'white',
        paddingHorizontal: 3,
    },
});

export const InputField = ({
    name,
    onChangeText,
    disable,
    label,
    validate,
    isFocus,
}) => {
    const [focus, setFocus] = useState(isFocus);
    const onFocus = () => {
        setFocus(true);
    };
    const onBlur = () => {
        if (name.length == 0) {
            setFocus(false);
        }
    };
    return (
        <View
            style={[styles.body, { borderColor: validate ? 'black' : 'red' }]}
        >
            {focus && (
                <View style={[{ flexDirection: 'row' }, styles.tranform]}>
                    <Text
                        style={[
                            styles.label,
                            { color: validate ? 'black' : 'red' },
                        ]}
                    >
                        {label}
                    </Text>
                </View>
            )}
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
    );
};
