import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { DETAIL_ORDER } from '../../../Constants/NameScreen'
import { ListOrder } from '../../../Components/ListOrder'
import { fetchData } from '../helper'
import { useSelector } from 'react-redux'


const Cancel = ({ navigation }) => {
   const id = useSelector((state) => state.userInforSlice.id)
   const [data, setData] = useState([])
   const isFocused = useIsFocused();
   const [refreshing, setRefreshing] = useState(false);

   const handleRefresh = () => {
      setRefreshing(true);
      fetchData()
      setRefreshing(false);
   };

   const payload = {
      customer_id: id,
      status: 4
   }

   const getData = async () => {
      const data = await fetchData(payload)
      let arrData = []
        data.map((item)=>{
            arrData.unshift(item)
        })
        setData(arrData);
   }

   useEffect(() => {
      if (isFocused) {
         getData()
      }
   }, [isFocused]);

   const getItem = (item) => {
      navigation.navigate(DETAIL_ORDER, {
         data: item,
         status: 4,
      })
   }

   return (
      <ListOrder data={data} onPress={getItem} />
   )
}

export default Cancel


