import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "../../Assets/icon"
import color from "../../Assets/color"
import { styles } from "./styles"
export const CheckSavedAddress = ({
    handleSavedLocate,
    save
}) => (
    <View style={styles.save}>
        <View>
            <Text style={styles.saveTitle}>Lưu địa điểm này</Text>
            <Text style={{ fontSize: 13 }}>Lưu thông tin cho các lần giao hàng sau</Text>
        </View>
        <TouchableOpacity onPress={handleSavedLocate}>
            <MaterialCommunityIcons
                name={save ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={25}
                color={save ? color.orange : color.silver}
            />
        </TouchableOpacity>
    </View>
)