import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { general } from '../assets/styles';
import * as AuthSession from 'expo-auth-session';
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from "@env";

export const Splash = () => {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Splash Screen</Text>
        </SafeAreaView>
    );
}

export const Home = ({route, navigation}) => {

    // State variables
    const [token, setToken] = React.useState("NULL");

    // OnMount
    React.useEffect(() => {
        setToken(route.params.token ? route.params.token : "NULL");
    }, []);

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Home Screen</Text>
            <Text>Token: {token}</Text>
        </SafeAreaView>
    );
}

export const Twitch = ({route, navigation}) => {

    // Twitch API
    const TWITCH_SCOPES = ["chat:edit", "chat:read"];
    const TWITCH_URL = "https://id.twitch.tv/oauth2/authorize";

    // AuthRequest
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            responseType: AuthSession.ResponseType.Token,
            clientId: TWITCH_CLIENT_ID,
            scopes: TWITCH_SCOPES,
            redirectUri: TWITCH_REDIRECT_URI,
        },
        {
          authorizationEndpoint: TWITCH_URL
        }
    );

    // OnMount
    React.useEffect(() => {
        // AuthRequest result
        if (response?.type === 'success') {
          const { access_token } = response.params;
          navigation.navigate("Home", { token: access_token })
        }
    }, [response]);

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Twitch Screen</Text>
            <Button 
            title="Authorize" 
            onPress={() => promptAsync({useProxy: true, TWITCH_REDIRECT_URI})}/>
        </SafeAreaView>
    );
}