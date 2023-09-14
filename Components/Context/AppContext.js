import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
   const [status, setStatus] = useState(false)
   const [id, setID] = useState('')
   const [reload, setReload] = useState(false)
   const [socket, setSocket] = useState(null);
   const [address, setAddress] = useState('')
   const [isUpdate, setUpdate] = useState(false)
   const [object, setObject] = useState({})
   const [orderID, setOrderID] = useState('')
   React.useEffect(() => {
      const getId = async() =>{
         setID(await AsyncStorage.getItem('id'))
      }
      getId()
   })

   const getSocket = () => {
      const newSocket = io('http://192.168.1.229:3000',{
         query: { id, type: 0 }
      })
      setSocket(newSocket);
      socket.on('connect', () => {
         socket.emit('joinRoom', 'customer');
      });
      return () => {
         newSocket.disconnect();
      };
   }

   const returnSocket = () => {
      if (socket) {
         socket.disconnect();
      }
   }

   return (
      <AppContext.Provider value={{
         status, setStatus,
         id, setID,
         socket, getSocket, returnSocket,
         address, setAddress,
         reload, setReload,
         isUpdate, setUpdate,
         object, setObject,
         orderID, setOrderID
      }}>
         {children}
      </AppContext.Provider>
   );
};

export default AppContext  // = () => useContext(AppContext)
