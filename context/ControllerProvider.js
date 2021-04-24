import React, {createContext, useState} from 'react';
import FireBase from '../utils/FireBase.js';

export const ControllerContext = createContext();

const fb = new FireBase();

export const ControllerProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    const logout = () => {
        setUserInfo(null);
        setUserEmail('');
    }

    const deleteUser = () => {
        if (userEmail && userEmail !== '') {
            fb.removeUser(userEmail);
        }
    }

    const login = async (email) => {
        if (email && email !== '') {
            // Valid email
            return await fb.getUserInfo(email)
                    .then((response) => {
                        // User exist in database
                        if (response) {
                            setUserEmail(email);
                            setUserInfo(response.userInfo);
                            return true;
                        } 
                        // User does not exist
                        return false;
                    }).catch(() => {return false});
        } 
        // Invalid email
        return false; 
    }

    const signup = (email) => {
        if (email && email !== '') {
            // Assume valid and unique email
            fb.addUser(email);
            setUserEmail(email);
            setUserInfo({ buttons: [], email: email, token: '' });
            return true;
        } 
        // Invalid email
        return false; 
    }

    const updateUserInfo = (userObject) => {
        setUserInfo(userObject);
        if (userEmail && userEmail !== '') {
            fb.updateUserInfo(userEmail, userObject);
        }
    };

    return(
        <ControllerContext.Provider
            value={{
                userInfo,
                updateUserInfo,
                userEmail,
                login,
                signup,
                logout,
                deleteUser,
            }}>
            {children}
        </ControllerContext.Provider>
    );
};