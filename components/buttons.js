import React from 'react';
import { Button, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { general } from '../assets/styles';

export const SmallBtn = (props) => {

    return (
        <TouchableOpacity style={general.smallButton} 
        onPress={props.myfunction}>
            <Text>SMALL</Text>
        </TouchableOpacity>
    );
}

export const MediumBtn = (props) => {

    return (
        <TouchableOpacity style={general.mediumButton} 
        onPress={props.myfunction}>
            <Text>MEDIUM</Text>
        </TouchableOpacity>
    );
}
export const LargeBtn = (props) => {

    return (
        <TouchableOpacity style={general.largeButton} 
        onPress={props.myfunction}>
            <Text>LARGE</Text>
        </TouchableOpacity>
    );
}