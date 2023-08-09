import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import color from '../../Contains/color'
import { Calendar, LocaleConfig } from 'react-native-calendars'

const ModalCalendar = ({ Message, Visible, onHide }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const onDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };
    return (
        //visible= true login hien , tranparent =true sysmodal trong suot
        <Modal visible={Visible} transparent={true}>
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(00,00,00,.5)', //trong suot 50%
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '90%',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    alignItems: 'center',

                }}>
                    {/* Header */}
                    <View style={{
                        paddingBottom: 15
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: color.orange
                        }}>THÔNG BÁO</Text>
                    </View>

                    {/* body */}
                    <View>
                        <Text style={{
                            fontSize: 16
                        }}>{Message}</Text>
                    </View>

                    <Calendar
                        current={selectedDate}
                        onDayPress={onDateSelect}
                        // renderHeader={(date) => {
                        //     return (
                        //         <View style={styles.header}>
                        //             <Text style={styles.headerText}>
                        //                 {date.toString('MMMM yyyy')}
                        //             </Text>
                        //         </View>
                        //     );
                        // }}
                        // markingType={'period'}
                        display="calendar"
                    />
                    <Text>{selectedDate}</Text>
                    {/* footer */}
                    <View>
                        <TouchableOpacity activeOpacity={0.5} onPress={onHide}>
                            <View style={{
                                width: '100%',
                                backgroundColor: color.orange,
                                borderRadius: 20,
                                paddingVertical: 5,
                                paddingHorizontal: 20,
                                marginTop: 15
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: "white"
                                }}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalCalendar

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});