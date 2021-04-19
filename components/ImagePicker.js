import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import BasicButton, { IconButton } from './Drawable';
import { Ionicons } from '@expo/vector-icons'

export default function ImagePicker() {
    const [image, setImage] = useState(null);

    // Ask user for Media & Camera permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { mediaStatus } = await ImgPicker.requestMediaLibraryPermissionsAsync();
                const { cameraStatus } = await ImgPicker.requestCameraPermissionsAsync();
            }
        })();
    }, []);

    // Select image from MediaLibrary
    const pickImage = async () => {
        let result = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    // Take a picture with Camera
    const takeImage = async () => {
        let result = await ImgPicker.launchCameraAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.shelf}>
            <IconButton name="camera" size={64} color={["#b3b3b3", "#cfcfcf"]} onPress={takeImage}></IconButton>
            <IconButton name="image" size={64} color={["#b3b3b3", "#cfcfcf"]} onPress={pickImage}></IconButton>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shelf: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});