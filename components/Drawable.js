import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import DismissKeyboard from './DismissKeyboard';

export const Background = ({ children }) => {
    return (
        <DismissKeyboard>
            <SafeAreaView style={[styles.container]}>
                <LinearGradient
                    colors={['#57199F', '#39085E', '#29003D']}
                    style={[styles.background, styles.container]}>
                    {children}
                </LinearGradient>
            </SafeAreaView>
        </DismissKeyboard>
    );
}

export const BasicButton = (props) => {
    return (
        <Pressable
            style={[props.containerStyle]}
            onPress={props.onPress}>
            {({pressed}) => (
            <LinearGradient 
                style={[styles.primary, props.style]}
                colors={pressed ? ['#EC466D', '#EB685C', '#EB8947'] : ['#EE6181', '#EE7C72', '#ED9A61']}>
                <Text style={styles.primaryText}>{props.title}</Text>
            </LinearGradient>
            )}
        </Pressable>
    );
}

export const IconButton = (props) => {
    return (
        <Pressable
            style={[props.style]}
            onPress={props.onPress}>
            {({ pressed }) => (
                <Ionicons
                    name={props.name}
                    size={props.size}
                    color={pressed ? props.color[1] : props.color[0]}>
                </Ionicons>
            )}
        </Pressable>
    );
}

export const AntIconButton = (props) => {
    return (
        <Pressable
            style={[props.style]}
            onPress={props.onPress}>
            {({ pressed }) => (
                <AntDesign
                    name={props.name}
                    size={props.size}
                    color={pressed ? props.color[1] : props.color[0]}>
                </AntDesign>
            )}
        </Pressable>
    );
}

export const VisualButton = (props) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.primary, { backgroundColor: pressed ? props.color[1] : props.color[0] }, props.style]}
            onPress={props.onPress}>
            {({ pressed }) => (
                <View style={styles.row}>
                    <Ionicons
                        style={{ marginRight: 4 }}
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
            placeholderTextColor="#0006"/>
    );
}

export const DescriptiveInput = (props) => {
    let alignment = props.textAlign ? props.textAlign : 'flex-start';
    return (
        <View style={[props.style, styles.column]}>
            <Text style={[styles.label, { alignSelf: alignment }]}>{props.label}</Text>
            <TextInput
                style={[styles.field]}
                onChangeText={props.onChangeText}
                value={props.text}
                secureTextEntry={props.secure}
                placeholder={props.placeholder}
                placeholderTextColor="#0006"/>
        </View>
    );
}

export const Row = (props) => {
    return (
        <View style={[styles.row, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
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
        color: '#000',
        backgroundColor: '#B9D6F2',
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