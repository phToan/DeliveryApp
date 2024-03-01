import React, { memo } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { AntDesign } from "../../Assets/icon"
import { styles } from "./styles"


export const Header = memo(({ onClickReturn, title }) => {
    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.icon} onPress={onClickReturn}>
                <AntDesign name='arrowleft' size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icon} />
        </View>
    )

})

// export default memo(Header)