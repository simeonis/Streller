import React from 'react';
import { Button, Text} from 'react-native';
import { general } from '../assets/styles';


export const SmallButton = (props) => {

    return (
        <Button style={general.container} 
        title="HELLO"
        onPress={props.myfunction}/>
    );
}