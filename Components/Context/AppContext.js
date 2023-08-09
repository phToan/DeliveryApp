import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lightDot, setLightDot] = useState(false);

  const toggleLightDot = () => {
    setLightDot(!lightDot);
  };

  const [status, setStatus] = useState(false)
  const [id, setID] = useState('')
  const [reload, setReload] = useState(false)
  const [socket, setSocket] = useState(null);
  const [address, setAddress] = useState('')
  const [isUpdate, setUpdate] = useState(false)

  useEffect(() => {
    const newSocket = io('http://192.168.1.229:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // const toggleStatus = () =>{
  //   setStatus(!status)
  // }

  // const socket = io('http://your-server-url');/

  return (
    <AppContext.Provider value={{ lightDot, toggleLightDot, status, setStatus, id, setID, socket, address, setAddress, reload, setReload,isUpdate, setUpdate }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext  // = () => useContext(AppContext)
