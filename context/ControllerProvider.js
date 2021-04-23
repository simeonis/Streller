import React, {createContext, useState} from 'react';

export const ControllerContext = createContext();

export const ControllerProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userID, setUserID] = useState('');

    const updateUserInfo = (userObject) => {
        setUserInfo(userObject);
        // Insert FireBase code
    };

    const updateUserID = (id) => {
        if (id === 'delete') {
            // Firebase delete user
        } else {
            setUserID(id);
        }
    }

    return(
        <ControllerContext.Provider
            value={{
                userInfo,
                updateUserInfo,
                userID,
                updateUserID
            }}>
            {children}
        </ControllerContext.Provider>
    );
};