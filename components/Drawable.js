import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export const BasicButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.primary, 
                { backgroundColor: pressed ? '#645c99' : '#8c9eff' },
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
            <View style={styles.row}>
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
            placeholderTextColor="#fff4" />
    );
}

export const DescriptiveInput = (props) => {
    let alignment = props.textAlign ? props.textAlign : 'flex-start';
    return (
        <View style={[props.style, styles.column]}>
        <Text style={[styles.label, {alignSelf: alignment}]}>{props.label}</Text>
        <TextInput
            style={[styles.field]}
            onChangeText={props.onChangeText}
            value={props.text}
            secureTextEntry={props.secure}
            placeholder={props.placeholder}
            placeholderTextColor="#fff4" />
        </View>
    );
}

export const Row = (props) => {
    return(
        <View style={[styles.row, props.style]}>
            {props.children}
        </View>
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
        width: '100%',
        borderRadius: 10,
        color: '#8c9eff',
        backgroundColor: '#422161',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        color: '#5f7cf9',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default BasicButton;