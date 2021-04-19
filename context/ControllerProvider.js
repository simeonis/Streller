import React, {createContext, useState} from 'react';

export const ControllerContext = createContext();

export const ControllerProvider = ({children}) => {
    const [btnData, setBtnData] = useState(null);

    return(
        <ControllerContext.Provider
            value={{
                btnData,
                setBtnData
            }}>
            {children}
        </ControllerContext.Provider>
    );
};