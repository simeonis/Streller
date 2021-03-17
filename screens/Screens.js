import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { general } from '../assets/styles';

export const Splash = () => {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Splash Screen</Text>
        </SafeAreaView>
    );
}

export const Home = ({route, navigation}) => {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Home Screen</Text>
            <Button 
                title="Next" 
                onPress={() => navigation.navigate("Twitch")}/>
        </SafeAreaView>
    );
}

export const Twitch = ({route, navigation}) => {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Twitch Screen</Text>
        </SafeAreaView>
    );
}