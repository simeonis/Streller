import * as ImgPicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { IconButton, Row } from './Drawable';

export default function ImagePicker(props) {
    // Ask user for Media & Camera permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                await ImgPicker.requestMediaLibraryPermissionsAsync();
                await ImgPicker.requestCameraPermissionsAsync();
            }
        })();
    }, []);

    // Select image from MediaLibrary
    const pickImage = async () => {
        let result = await ImgPicker.launchImageLibraryAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled && props.setImage) {
            props.setImage(result.uri);
        }
    };

    // Take a picture with Camera
    const takeImage = async () => {
        let result = await ImgPicker.launchCameraAsync({
            mediaTypes: ImgPicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled && props.setImage) {
            props.setImage(result.uri);
        }
    };

    return (
        <View style={[styles.column, props.style]}>
            <Image
                source={{uri: props.image}}
                style={[styles.display, {width: props.size}]}>
            </Image>
            <Row>
                <IconButton style={{right: 6}} name="camera" size={parseInt(props.size)*0.5} color={["#5f7cf9", "#cfcfcf"]} onPress={takeImage}/>
                <IconButton style={{left: 6}} name="image" size={parseInt(props.size)*0.5} color={["#F9DC5F", "#cfcfcf"]} onPress={pickImage}/>
            </Row>
        </View>
    );
}

const styles = StyleSheet.create({
    display: {
      height: 'auto',
      aspectRatio: 1,
      borderRadius: 8,
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
  });