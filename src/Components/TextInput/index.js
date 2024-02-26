import React, { memo } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";

export const textInput = memo(({
    label,
    star,
    placeholder,
    value,
    keyboardType,
    onChangeText
}) => (
    <>
        <Text style={styles.label}>{label} <Text style={styles.star}>{star}</Text></Text>
        <View style={styles.border}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    </>
))