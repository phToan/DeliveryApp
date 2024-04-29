import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { EmptyComponent } from './components/emptyComponent'
import { SeparatorView } from './components/separatorView'
import { StyleSheet } from 'react-native'
import { OrderItem } from '../OrderItem'

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#f7f8fa',
        marginTop: 5
    }
})

export const ListOrder = ({
    onPress,
    data,
}) => (
    <SafeAreaView style={styles.body}>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <OrderItem item={item} onPress={onPress} />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <SeparatorView />
            )}
            ListEmptyComponent={() => (
                <EmptyComponent />
            )}

        />
    </SafeAreaView>
)