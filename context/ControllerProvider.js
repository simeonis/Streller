import React, {createContext, useState} from 'react';

export const ControllerContext = createContext();

export const ControllerProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);

    return(
        <ControllerContext.Provider
            value={{
                userInfo,
                setUserInfo
            }}>
            {children}
        </ControllerContext.Provider>
    );
};