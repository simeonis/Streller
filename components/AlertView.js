import React from 'react'
import { View, Modal, StyleSheet } from 'react-native';

const AlertView = ({children, toggleVisibility}) => {
    return (
        <View>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={toggleVisibility}>
                <View style = {styles.centerView}>
                    <View style = {[styles.modalView, styles.shadow, {backgroundColor: '#FFFFFF'}]}>
                        {children}
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
})

export default AlertView;