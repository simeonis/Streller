import React, {createContext, useState} from 'react';
import FireBase from '../utils/FireBase';

export const ControllerContext = createContext();

const fb = new FireBase();

export const ControllerProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userID, setUserID] = useState('');

    const updateUserInfo = (userObject) => {
        setUserInfo(userObject);
        fb.updateUserInfo(userID, userObject);
    };

    const updateUserID = (email) => {
        if (email === 'delete') {
            fb.removeUser(userInfo.email)
        } else {
            let data = fb.getUserInfo(email);
            if (data === undefined){
                fb.addUser(email);
            }else{
                userInfo = data;
            }
            setUserID(email);
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