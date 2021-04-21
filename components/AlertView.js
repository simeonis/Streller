import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

const AlertView = ({children, toggleVisibility}) => {
    return (
        <View>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={toggleVisibility}>
                <View style = {styles.centerView}>
                    <View style = {[styles.modalView, styles.shadow, {backgroundColor: '#28143b'}]}>
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
        margin: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 12,
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