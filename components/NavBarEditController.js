import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import AlertView from './AlertView';
import BasicButton from './Drawable';
import { useContext } from 'react';
import { ControllerContext } from '../context/ControllerProvider';

const NavBarEditController = (props) => {
    const [visibility, setVisibility] = useState(false);
    const {btnData, setBtnData} = useContext(ControllerContext);

    const addButton = () => {
        let list = btnData
        if (list.length < 10) {
            list.push({type: 'large', id: (list.length+1), titles: ['1'], msg: ['Hello']})
            setBtnData(list)
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>{props.children.title}</Text>
                <BasicButton 
                    title="Manage Buttons"
                    onPress={() => setVisibility(true)}/>
            </View>
            <AlertView toggleVisibility={visibility}>
                <BasicButton 
                    title="Add"
                    onPress={addButton}/>
                <BasicButton 
                    title="Clear"
                    onPress={() => setBtnData([])}/>
                <BasicButton 
                    title="Close"
                    onPress={() => setVisibility(false)}/>
            </AlertView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
    },
})

export default NavBarEditController;