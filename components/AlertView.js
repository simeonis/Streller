import { LinearGradient } from 'expo-linear-gradient';
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
                <LinearGradient 
                            style={styles.background}
                            colors={['#57199F', '#39085E', '#29003D']}>
                    <View style = {[styles.modalView]}>
                        {children}
                    </View>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centerView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#00000077',
    },
    background: {
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        padding: 8,
    },
    modalView: {
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
})

export default AlertView;