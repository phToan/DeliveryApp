// import React, { createContext, useContext, useState } from 'react';
// import { showMessage } from 'react-native-flash-message';

// const GlobalContext = createContext();

// export const GlobalProvider = ({ children }) => {
//     const [state, setState] = useState(false);
//     const [message, setMessage] = useState('State has changed!');
//     const [description, setDescription] = useState(
//         'The state has been updated.'
//     );

//     const changeState = (message, description) => {
//         setState(!state);
//         showMessage({
//             message: message ?? '',
//             description: description ?? '',
//             type: 'success',
//         });
//     };

//     return (
//         <GlobalContext.Provider value={{ state, changeState }}>
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = () => useContext(GlobalContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import {
    getDatabase,
    onValue,
    off,
    ref,
    onChildAdded,
    onChildRemoved,
} from 'firebase/database';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const database = getDatabase();
        const dataRef = ref(database, 'order');
        // const reference = database().ref('/path/to/your/data');

        const onDataChange = (snapshot) => {
            const newData = snapshot.val();
            setData(newData);

            if (newData) {
                const changedObjects = [];
                Object.entries(newData ?? []).forEach(([key, value]) => {
                    if (
                        data &&
                        data[key] &&
                        data[key].driver.status !== value.driver.status
                    ) {
                        changedObjects.push({ key, newValue: value });
                    }
                });
                console.log(changedObjects);
                if (changedObjects.length > 0) {
                    showMessage({
                        message: "Field 'b' changed!",
                        description: 'status thay ddoi',
                        type: 'info',
                    });
                }
            }
        };
        const unsubscribe = onValue(dataRef, onDataChange);

        // Cleanup listener on unmount
        return () => {
            off(dataRef, onDataChange);
            unsubscribe();
        };
    }, []);

    return (
        <GlobalContext.Provider value={{ data }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
