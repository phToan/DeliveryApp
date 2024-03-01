import React from "react"
import { Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    t_status: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    }
})

export const Status = ({
    status,
    item
}) => {
    if (status == 1) {
        return (
            item.driver_id != 0 ?
                <>
                    <Text style={styles.t_status}>Tài xế đang đến địa điểm lấy hàng</Text>
                    <Text style={{ color: 'white', marginTop: 5 }}>Vui lòng chờ trong vài phút!</Text>
                </>
                :
                <>
                    <Text style={styles.t_status}>Đang tìm tài xế</Text>
                    <Text style={{ color: 'white', marginTop: 5 }}>Vui lòng chờ trong vài phút!</Text>
                </>
        )
    } else if (status == 2) {
        return (
            <Text style={styles.t_status}>Đang giao hàng</Text>
        )
    } else if (status == 3) {
        return (
            <>
                <Text style={styles.t_status}>Giao hàng thành công</Text>
                <Text style={{ color: 'white', marginTop: 5 }}>Cảm ơn bạn đã tin tưởng chúng tôi!</Text>
            </>
        )
    } else {
        return (
            <Text style={styles.t_status}>Đơn hàng đã bị hủy bởi bạn!</Text>
        )
    }
}