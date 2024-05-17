import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextFont } from '../../../../Components/Text';
import color from '../../../../Assets/color';

const styles = StyleSheet.create({
    t_status: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
});

export const Status = ({ status, item }) => {
    if (status == 1) {
        return item.driver.id !== 0 ? (
            <>
                <TextFont
                    title={'Tài xế đang đến địa điểm lấy hàng'}
                    fw="bold"
                    fs={16}
                    color={color.white}
                />
                <TextFont
                    title={'Vui lòng chờ trong vài phút!'}
                    color={color.white}
                    mt={5}
                />
            </>
        ) : (
            <>
                <TextFont
                    title={'Đang tìm tài xế'}
                    fw="bold"
                    fs={16}
                    color={color.white}
                />
                <TextFont
                    title={'Vui lòng chờ trong vài phút!'}
                    color={color.white}
                    mt={5}
                />
            </>
        );
    } else if (status == 2) {
        return <Text style={styles.t_status}>Đang giao hàng</Text>;
    } else if (status == 3) {
        return (
            <>
                <Text style={styles.t_status}>Giao hàng thành công</Text>
                <Text style={{ color: 'white', marginTop: 5 }}>
                    Cảm ơn bạn đã tin tưởng chúng tôi!
                </Text>
            </>
        );
    } else {
        return <Text style={styles.t_status}>Đơn hàng đã bị hủy bởi bạn!</Text>;
    }
};
