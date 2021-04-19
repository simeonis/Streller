import React from 'react'
import { Text, Pressable, TextInput, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export const BasicButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.primary, 
                { backgroundColor: pressed ? '#645c99' : '#443c76' },
                { width: props.width },
                { height: props.height },
                props.style
            ]}
            onPress={props.onPress}>
            <Text style={styles.primaryText}>{props.title}</Text>
        </Pressable>
    );
}

export const IconButton = (props) => {
    return (
        <Pressable
            style={[props.style]}
            onPress={props.onPress}>
            {({pressed}) => (
            <Ionicons 
                name={props.name} 
                size={props.size} 
                color={pressed ? props.color[1] : props.color[0]}>
            </Ionicons>
            )}
        </Pressable>
    );
}

export const VisualButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.primary, { backgroundColor: pressed ? props.color[1] : props.color[0] }, props.style]}
            onPress={props.onPress}>
            {({pressed}) => (
            <View style={styles.shelf}>
            <Ionicons
                style={{marginRight: 4}}
                name={props.iconName} 
                size={props.size ? props.size : 32} 
                color={props.iconColor}>
            </Ionicons>
            <Text style={styles.primaryText}>{props.title}</Text>
            </View>
            )}
        </Pressable>
    );
}

export const BasicInput = (props) => {
    return (
        <TextInput
            style={[styles.field, props.style]}
            onChangeText={props.onChangeText}
            value={props.text}
            secureTextEntry={props.secure}
            placeholder={props.placeholder}
            placeholderTextColor="#00000055" />
    );
}

const styles = StyleSheet.create({
    primary: {
        margin: 4,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 0,
    },
    primaryText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    field: {
        margin: 10,
        padding: 2,
        paddingHorizontal: 16,
        width: '80%',
        borderRadius: 32,
        color: '#000000',
        backgroundColor: '#f0f4f5',
    },
    shelf: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default BasicButton;