import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ControllerContext } from '../context/ControllerProvider';

const SmallBtn = (props) => {
    return (
        <Pressable 
            style={({pressed}) => 
                [styles.smallButton, styles.container, 
                { borderColor: pressed ? '#8c9eff' : '#28143b' }]} 
            onPress={props.onPress}
            onLongPress={props.onLongPress}>
            <Image source={{uri: props.image}} style={styles.buttonImg}/>
        </Pressable>
    );
}

const MediumBtn = (props) => {
    return (
        <Pressable 
            style={({pressed}) => 
                [styles.mediumButton, styles.container, 
                { borderColor: pressed ? '#8c9eff' : '#28143b' }]} 
            onPress={props.onPress}
            onLongPress={props.onLongPress}>
            <Image source={{uri: props.image}} style={[styles.buttonHalfImg]}/>
        </Pressable>
    );
}

const LargeBtn = (props) => {
    return (
        <Pressable 
            style={({pressed}) => 
                [styles.largeButton, styles.container,
                { borderColor: pressed ? '#8c9eff' : '#28143b' }]}
            onPress={props.onPress}
            onLongPress={props.onLongPress}>
            <Image source={{uri: props.image}} style={styles.buttonImg}/>
        </Pressable>
    );
}

export const GridView = (props) => {
    const { btnData, setBtnData } = useContext(ControllerContext);

    const sendMessage = (message) => {
        props.onPress(message);
    }

    const buttonMap = (id, type, titles, messages, images) => {
        if (type === 'small') {
            return(
                <View>
                    <View style={styles.container}>
                    <SmallBtn 
                            onPress={() => sendMessage(messages[0])}
                            onLongPress={() => props.onLongPress([id, 0])}
                            title={titles[0]}
                            image={images[0]}>
                        </SmallBtn>
                        <SmallBtn 
                            onPress={() => sendMessage(messages[1])}
                            onLongPress={() => props.onLongPress([id, 1])}
                            title={titles[1]}
                            image={images[1]}>
                        </SmallBtn>
                    </View>
                    <View style={styles.container}>
                    <SmallBtn 
                            onPress={() => sendMessage(messages[2])}
                            onLongPress={() => props.onLongPress([id, 2])}
                            title={titles[2]}
                            image={images[2]}>
                        </SmallBtn>
                        <SmallBtn 
                            onPress={() => sendMessage(messages[3])}
                            onLongPress={() => props.onLongPress([id, 3])}
                            title={titles[3]}
                            image={images[3]}>
                        </SmallBtn>
                    </View>
                </View>);
        } else if (type === 'medium') {
            return(
                <View>
                    <MediumBtn
                        onPress={() => sendMessage(messages[0])}
                        onLongPress={() => props.onLongPress([id, 0])}
                        title={titles[0]}
                        image={images[0]}>
                    </MediumBtn>
                    <MediumBtn
                        onPress={() => sendMessage(messages[1])}
                        onLongPress={() => props.onLongPress([id, 1])}
                        title={titles[1]}
                        image={images[1]}>
                    </MediumBtn>
                </View>);
        } else if (type === 'large') {
            return(<LargeBtn 
                    onPress={() => sendMessage(messages[0])}
                    onLongPress={() => props.onLongPress([id, 0])}
                    title={titles[0]}
                    image={images[0]}>
                    </LargeBtn>);
        } else {
            return;
        }
    }

    return(
        <View style={[styles.container]}>
            <View>
            <FlatList
                data={btnData.buttons}
                renderItem={({item}) => buttonMap(item.id, item.type, item.titles, item.msg, item.img)}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    smallButton: {
        width: 82,
        height: 82,
        margin: 8,
        borderWidth: 3,
        backgroundColor: '#422161',
        borderColor:'#28143b',
        borderRadius: 10,
    },
    mediumButton: {
        width: 180,
        height: 82,
        borderRadius: 10,
        margin: 8,
        borderWidth: 3,
        backgroundColor: '#422161',
        borderColor:'#28143b',
        borderRadius: 10,
    },
    largeButton: {
        alignSelf: 'flex-start',
        width: 180,
        height: 180,
        margin: 8,
        borderWidth: 3,
        backgroundColor: '#422161',
        borderColor:'#28143b',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 24,
    },
    buttonImg: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1,
        borderRadius: 6,
        overflow: 'hidden',
    },
    buttonHalfImg: {
        width: '100%',
        height: 'auto',
        aspectRatio: 2.2,
        borderRadius: 6,
        overflow: 'hidden',
    }
});

export default GridView;