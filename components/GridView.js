import React from 'react'
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { ControllerContext } from '../context/ControllerProvider';

const SmallBtn = (props) => {
    const img = require('../assets/default.png');

    return (
        <TouchableOpacity style={[styles.smallButton, styles.container]} 
        onPress={props.onPress}>
            <Image source={img} style={styles.buttonImg}/>
        </TouchableOpacity>
    );
}

const MediumBtn = (props) => {
    const img = require('../assets/default.png');

    return (
        <TouchableOpacity style={[styles.mediumButton, styles.container]} 
        onPress={props.onPress}>
            <Image source={img} style={styles.buttonHalfImg}/>
        </TouchableOpacity>
    );
}

const LargeBtn = (props) => {
    const img = require('../assets/default.png');

    return (
        <Pressable 
            style={({pressed}) => 
                [styles.largeButton, 
                styles.container, 
                { backgroundColor: pressed ? '#b1f2a7' : '#9EE493' }]} 
            onPress={props.onPress}
            onLongPress={() => props.onLongPress("Modify Large Button")}>
            <Image source={img} style={styles.buttonImg}/>
        </Pressable>
    );
}

export const GridView = (props) => {
    const { btnData, setBtnData } = useContext(ControllerContext);

    const buttonMap = (type, titles, msg) => {
        if (type === 'small') {
            return(
                <View>
                    <View style={styles.container}>
                        <SmallBtn
                            onPress={() => props.onPress(msg[0])}
                            title={titles[0]}></SmallBtn>
                        <SmallBtn 
                            onPress={() => props.onPress(msg[1])}
                            title={titles[1]}></SmallBtn>
                    </View>
                    <View style={styles.container}>
                        <SmallBtn 
                            onPress={() => props.onPress(msg[2])}
                            title={titles[2]}></SmallBtn>
                        <SmallBtn 
                            onPress={() => props.onPress(msg[3])}
                            title={titles[3]}></SmallBtn>
                    </View>
                </View>);
        } else if (type === 'medium') {
            return(
                <View>
                    <MediumBtn 
                        onPress={() => props.onPress(msg[0])}
                        title={titles[0]}></MediumBtn>
                    <MediumBtn
                        onPress={() => props.onPress(msg[1])}
                        title={titles[1]}></MediumBtn>
                </View>);
        } else if (type === 'large') {
            return(<LargeBtn 
                    onPress={() => props.onPress(msg[0])}
                    onLongPress={props.onLongPress}
                    title={titles[0]}>
                    </LargeBtn>);
        } else {
            return(<View></View>);
        }
    }

    return(
        <View>
            <FlatList
                contentContainerStyle={{justifyContent:'space-between'}}
                renderItem={({item}) => buttonMap(item.type, item.titles, item.msg)}
                keyExtractor={(item) => item.id}
                numColumns={2}
                data={btnData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:"row",
        justifyContent: "center",
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    smallButton: {
        justifyContent:'center',
        backgroundColor: '#DDDDDD',
        width: 82,
        height: 82,
        borderRadius: 10,
        padding: 10,
        margin: 8,
    },
    mediumButton: {
        justifyContent:'center',
        backgroundColor: '#DAF7DC',
        width: 180,
        height: 82,
        borderRadius: 10,
        padding: 8,
        margin: 8,
    },
    largeButton: {
        justifyContent:'center',
        backgroundColor: '#9EE493',
        width: 180,
        height: 180,
        borderRadius: 10,
        padding: 8,
        margin: 8,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 24,
    },
    buttonImg: {
        width: '75%',
        height: 'auto',
        aspectRatio: 1,
    },
    buttonHalfImg: {
        width: '40%',
        height: 'auto',
        aspectRatio: 1,
        padding: 10,
    }
});

export default GridView;