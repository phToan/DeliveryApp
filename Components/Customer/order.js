
import TabStatus from './Item/ordStatus'

const Order = ({ route,navigation}) => {
   return(
      <SafeAreaView style={{flex:1}}>
         <View style={{
            flex: 1,
            backgroundColor: 'darkorange'
         }}>
         </View>
         <View style={{flex:20}}>
            <TabStatus/>
         </View>
      </SafeAreaView>
   )
}

export default Order

