import React from 'react';
import { Button, SafeAreaView, Text, TextInput } from 'react-native';
import { general } from '../assets/styles';
import * as AuthSession from 'expo-auth-session';
import { BasicButton, SmallButton } from '../components/buttons';

// Envi
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from "@env";
import ChatBot from '../utils/chatbot';

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
    const [username, setUsername] = React.useState("NULL");

    // ChatBot
    const chatbot = new ChatBot(route.params.username, route.params.token);
    chatbot.join(route.params.username);

    // OnMount
    React.useEffect(() => {
        setToken(route.params.token ? route.params.token : "NULL");
        setUsername(route.params.username ? route.params.username : "NULL");
    }, []);

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Home Screen</Text>
            <Text>Username: {username}</Text>
            <Text>Token: {token}</Text>
            <Button 
            title="Test ChatBot" 
            onPress={() => chatbot.send("Infi says: HI!!")}/>
        </SafeAreaView>
    );
}

export const Twitch = ({route, navigation}) => {

    // Twitch API
    const TWITCH_SCOPES = ["chat:edit", "chat:read"];
    const TWITCH_BASE_URL = "https://id.twitch.tv/oauth2/";
    const TWITCH_AUTH_PATH = "authorize";
    const TWITCH_VALID_PATH = "validate";

    // Temporary (Missing DataBase)
    let TEMP_TOKEN = "2m9m5crfbuoptntx1jchdjrr65jocr";

    // Generate new token
    const [authRequest, authResponse, authPrompt] = AuthSession.useAuthRequest(
        {
            responseType: AuthSession.ResponseType.Token,
            clientId: TWITCH_CLIENT_ID,
            scopes: TWITCH_SCOPES,
            redirectUri: TWITCH_REDIRECT_URI,
        },
        {
          authorizationEndpoint: TWITCH_BASE_URL + TWITCH_AUTH_PATH
        }
    );

    // Validate Token
    const validateToken = async (access_token) => {
        fetch(TWITCH_BASE_URL + TWITCH_VALID_PATH, {
            method: 'GET',
            headers: {
                "Authorization": `OAuth ${access_token}`
            }
        })
        .then((validResponse) => validResponse.json())
        .then((json) => {
            // Valid non-expired token
            if (json.expires_in && json.expires_in > 0) {
                navigation.navigate("Controller", { token: access_token, username: json.login})
            } 
            // Invalid token, ask for another
            else {
                authPrompt({useProxy: true, TWITCH_REDIRECT_URI});
            }
        })
        .catch((error) => {
            console.error(`Unsucessful validation request: ${error}`);
        });
    }

    // OnTokenGeneration
    React.useEffect(() => {
        // AuthRequest result
        if (authResponse?.type === 'success') {
            const { access_token } = authResponse.params;
            TEMP_TOKEN = access_token;
        }
    }, [authResponse]);

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Twitch Screen</Text>
            <Button 
            title="Validate Token" 
            onPress={() => validateToken(TEMP_TOKEN)}/>
        </SafeAreaView>
    );
}

export const Login = ({route, navigation}) => {

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Login</Text>
            <Text>Username</Text>
            <TextInput style={general.textinput} placeholder="Username"/>
            <Text>Password</Text>
            <TextInput style={general.textinput} placeholder="Password" secureTextEntry={true}/>
            <Button 
            title="Login" 
            onPress={() => navigation.navigate("Twitch")}/>
        </SafeAreaView>
    );
}

export const SignUp = ({route, navigation}) => {

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Sign Up</Text>
            <Text>Username</Text>
            <TextInput style={general.textinput} placeholder="Username"/>
            <Text>Password</Text>
            <TextInput style={general.textinput} placeholder="Password" secureTextEntry={true}/>
            <Text>Confirm Password</Text>
            <TextInput style={general.textinput} placeholder="Confirm Password" secureTextEntry={true}/>
            <Button 
            title="Sign Up" 
            onPress={() => navigation.navigate("Twitch")}/>
        </SafeAreaView>
    );
}

export const Welcome = ({route, navigation}) => {

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Welcome</Text>
            <Button 
            title="Login" 
            onPress={() => navigation.navigate("Login")}/>
            <Button 
            title="Sign Up" 
            onPress={() => navigation.navigate("SignUp")}/>
            {/* to be deleted */}
            <Button 
            title="Straight to controller" 
            onPress={() => navigation.navigate("Controller")}/>
        </SafeAreaView>
    );
}

export const Controller = ({route, navigation}) => {
    // State variables
    const [token, setToken] = React.useState("NULL");
    const [username, setUsername] = React.useState("NULL");

    // ChatBot
    const chatbot = new ChatBot(route.params.username, route.params.token);
    chatbot.join(route.params.username);

    // OnMount
    React.useEffect(() => {
        setToken(route.params.token ? route.params.token : "NULL");
        setUsername(route.params.username ? route.params.username : "NULL");
    }, []);

    // Chatboot Send Function
    const sendMessage = () =>{
        chatbot.send(message);
    }
    //Message to be sent through the chatbot
    let message="Bello";
    return (
        <SafeAreaView style={general.controller}>
            <SmallButton  myfunction={sendMessage}/>
        </SafeAreaView>
    );
}