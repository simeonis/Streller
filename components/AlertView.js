import React from 'react'
import { View, Modal, StyleSheet, Text, TouchableHighlight, Pressable } from 'react-native';

/**
 * Custom Alert component
 * @param {Object} options {visibility, title, text}
 * @param {SetStateAction} setOptions Modify any of the listed options
 */
const AlertView = ({options, setOptions}) => {
    return (
        <View>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={options.visibility}>
                <View style = {styles.centerView}>
                    <View style = {[styles.modalView, styles.shadow, {backgroundColor: '#FFFFFF'}]}>
                        <Text style = {styles.titleStyle}>{options.title}</Text>
                        <View style = {{width: '100%', height: 0.5, backgroundColor: '#000000', marginVertical: 15}}/>
                        <Text style = {styles.textStyle}>{options.text}</Text>
                        <Pressable
                            style={({pressed}) => [
                                styles.buttonStyle, 
                                styles.shadow,
                                {backgroundColor: pressed ? '#94b234' : '#A4C639' 
                            }]} 
                            onPress = {() => {setOptions({visibility: false})}}>
                            <Text style = {styles.buttonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: '#00000077',
    },
    modalView: {
        width: '80%',
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5,
    },
    titleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
    },
    buttonStyle: {
        borderRadius: 5,
        padding: 10,
        elevation: 0,
        width: '100%',
        marginTop: 40
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})

export default AlertView;