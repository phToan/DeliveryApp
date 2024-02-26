import { Modal, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'

const SysModal = ({ Message, Visible, onHide }) => {

    return (
        //visible= true login hien , tranparent =true sysmodal trong suot
        <Modal visible={Visible} transparent={true}>
            <View style={styles.modal}>
                <View style={styles.body}>
                    {/* Header */}
                    <View style={{
                        paddingBottom: 15
                    }}>
                        <Text style={styles.message}>THÔNG BÁO</Text>
                    </View>
                    <Text style={styles.message_body}>{Message}</Text>
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

export default SysModal