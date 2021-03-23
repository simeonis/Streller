import React from 'react';
import { Button, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { general } from '../assets/styles';


export const SmallButton = (props) => {

    return (
        <TouchableOpacity style={general.smallButton} 
        onPress={props.myfunction}>
            <Text>he</Text>
        </TouchableOpacity>
    );
}