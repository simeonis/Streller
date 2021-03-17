import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { general } from '../assets/styles';

export default function Home() {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Home Screen</Text>
        </SafeAreaView>
    );
}