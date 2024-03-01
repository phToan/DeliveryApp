import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { renderTime } from "../help"

const styles = StyleSheet.create({
    t_payment: {
        fontSize: 16,
        fontWeight: '500'
    },
    id_order: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10
    },
    _id_order_item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export const DetailTime = ({ item }) => (
    <View style={styles.id_order}>
        <View style={styles._id_order_item}>
            <Text style={styles.t_payment}>Mã đơn hàng</Text>
            <Text style={styles.t_payment}>{item.id}</Text>
        </View>
        <View style={styles._id_order_item}>
            <Text style={{ color: '#3c3c38' }}>Thời gian tạo đơn</Text>
            <Text style={{ color: '#3c3c38' }}>{renderTime(item.createdAt)}</Text>
        </View>
        {/* {isStatus()
                            ? <View> */}
        {/* <View style={styles._id_order_item}>
                     <Text style={{ color: '#3c3c38' }}>Thời gian lấy hàng</Text>
                     <Text style={{ color: '#3c3c38' }}>{renderTime(item.takeAt)}</Text>
                  </View>
                  <View style={styles._id_order_item}>
                     <Text style={{ color: '#3c3c38' }}>Thời gian hoàn thành</Text>
                     <Text style={{ color: '#3c3c38' }}>{renderTime(item.confirmAt)}</Text>
                  </View> */}
        {/* </View>
                            : <View style={styles._id_order_item}>
                                <Text style={{ color: '#3c3c38' }}>Thời gian hủy đơn</Text>
                                <Text style={{ color: '#3c3c38' }}>{renderTime(route?.params.data.deleteAt)}</Text>
                            </View>
                        } */}
    </View>
)