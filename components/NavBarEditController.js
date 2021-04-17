import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import AlertView from './AlertView';

const NavBarEditController = (props) => {
    const [visibility, setVisibility] = useState(false);

    return (
        <View>
            <View style={styles.container}>
            <Text style={styles.title}>{props.children.title}</Text>
            <Pressable
                style={({ pressed }) => 
                    [styles.buttonStyle, 
                    { backgroundColor: pressed ? '#94b234' : '#A4C639' }]}
                onPress={() => setVisibility(true)}>
                <Text style={styles.buttonText}>Add Button</Text>
            </Pressable>
            </View>
            <AlertView toggleVisibility={visibility}>
                <Pressable
                    style={({ pressed }) => [
                        styles.buttonStyle,
                        { backgroundColor: pressed ? '#94b234' : '#A4C639' }]}
                    onPress={() => setVisibility(false)}>
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonStyle: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 0,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})

export default NavBarEditController;