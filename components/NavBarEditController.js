import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import cat from '../assets/default/cat.png';
import confetti from '../assets/default/confetti.png';
import dog from '../assets/default/dog.png';
import smile from '../assets/default/smile.png';
import { ControllerContext } from '../context/ControllerProvider';
import { IconButton, Row } from './Drawable';

const NavBarEditController = (props) => {
    const { userInfo, updateUserInfo } = useContext(ControllerContext);

    const randomDefault = () => {
        let imageArr = [dog, cat, confetti, smile];
        let random = Math.floor(Math.random() * 4);
        return Image.resolveAssetSource(imageArr[random]).uri;
    }

    const addButton = () => {
        let list = userInfo.buttons;
        if (list && list.length < 10) {
            list.push({id: list.length+1, type: 'large', titles: ['Default'], msg: ['Hello from Streller!'], img: [randomDefault()]});
            updateUserInfo({buttons: list, email: userInfo.email, token: userInfo.token});
        } else {
            updateUserInfo({buttons: [{id: 1, type: 'large', titles: ['Default'], msg: ['Hello from Streller!'], 
            img: [randomDefault()]}], email: userInfo.email, token: userInfo.token});
        }
    }

    const clearButton = () => {
        if (userInfo.buttons.length > 0) {
            updateUserInfo({buttons: [], email: userInfo.email, token: userInfo.token});
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>{props.children.title}</Text>
                <Row>
                <IconButton
                    style={{marginHorizontal: 8}}
                    name='add-circle'
                    size={32}
                    color={['#47b27c', '#5bd497']}
                    onPress={addButton}>
                </IconButton>
                <IconButton
                    style={{marginHorizontal: 8}}
                    name='trash'
                    size={32}
                    color={['#ff6961', '#565656']}
                    onPress={clearButton}>
                </IconButton>
                </Row>
            </View>
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
        color: '#add8e6',
    },
})

export default NavBarEditController;