import React from "react"
import { TouchableOpacity, } from "react-native"
import { MaterialCommunityIcons } from "../../Assets/icon"
import { styles } from "./styles"
export const ExitButtonCircle = ({
    onPressExit
}) => (
    <TouchableOpacity style={styles.bt_left} onPress={onPressExit}>
        <MaterialCommunityIcons name="chevron-left" size={30} color={'black'} />
    </TouchableOpacity>
)