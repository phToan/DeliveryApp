import React, { } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const inforModal = ({ address, name, phone, visible, onHide }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modal}>
                <View style={styles.map}></View>
                <View style={styles.body}>
                    {/* Header */}

                    <View style={{
                        paddingBottom: 15
                    }}>
                        <Text style={styles.message}>Thông tin người gửi</Text>
                    </View>
                    <Text style={styles.message_body}>{address}</Text>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={onHide}
                            style={styles.bt_ok}>
                            <Text style={styles.bt_title}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default inforModal