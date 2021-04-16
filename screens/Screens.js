import React, {useState} from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { general, button, input } from '../assets/styles';
import * as AuthSession from 'expo-auth-session';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AlertView from '../components/AlertView';
import DismissKeyboard from '../components/DismissKeyboard';
import GridView from '../components/GridView';

// TwitchBot
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
    const [token, setToken] = useState("NULL");
    const [username, setUsername] = useState("NULL");
    const [alertOptions, setAlertOptions] = useState({visibility: false});

    // OnMount
    React.useEffect(() => {
        setToken(route.params.token ? route.params.token : "NULL");
        setUsername(route.params.username ? route.params.username : "NULL");
    }, []);

    return (
        <SafeAreaView style={general.container}>
            <View style={general.shelf}>
                <TouchableOpacity 
                    style={[button.round, general.shadow]} 
                    onPress={() => navigation.navigate("Channel", { token: token, username: username })}>
                    <Text style={button.text}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[button.round, general.shadow]}
                    onPress={() => navigation.navigate("Workshop")}>
                    <Text style={button.text}>Customize</Text>
                </TouchableOpacity>
            </View>
            <View style={general.bottomTab}>
                <Text>Username: {username}</Text>
                <Text>Token: {token}</Text>
            </View>
            <AlertView
                options={alertOptions}
                setOptions={setAlertOptions}>
            </AlertView>
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
                navigation.navigate("Home", { token: access_token, username: json.login})
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
        </SafeAreaView>
    );
}

export const Channel = ({route, navigation}) => {
    // State variables
    const [channel, setChannel] = React.useState("");

    // Confirm channel
    const confirm = () => {
        if (channel && route.params.username && route.params.token) {
            navigation.navigate("Controller", {
                token: route.params.token, 
                username: route.params.username,
                channel: channel
            });
            setChannel("");
        }
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <Text style={input.label}>Enter Twitch Channel</Text>
            <TextInput 
            style={[input.field, general.shadow]}
            onChangeText={setChannel}
            value={channel}
            placeholder="Channel Name"
            placeholderTextColor="#FFFFFF88"/>
            <Button
            title="Confirm"
            onPress={confirm}/>
        </SafeAreaView>
        </DismissKeyboard>
    );
}

export const Workshop = () => {
    return (
        <SafeAreaView style={general.container}>
            <GridView></GridView>
        </SafeAreaView>
    );s
}


export const Controller = ({route, navigation}) => {
    // State variables
    const [bot, setBot] = React.useState(null);
    const [channel, setChannel] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [alertOptions, setAlertOptions] = useState({visibility: false, title: "", text: ""})

    // OnBotUpdate
    React.useEffect(() => {
        if (bot) 
            bot.join(channel);
        // Cleanup
        return () => {
            if (bot) {
                bot.leave();
                setBot(null);
            }
        };
    }, [bot]);

    // OnMount
    React.useEffect(() => {
        if (route.params.channel) {
            setChannel(route.params.channel.toLowerCase());
            setBot(new ChatBot(route.params.username, route.params.token, onNoticeHandler));
        } else setChannel("");
    }, []);

    // Bot event handler
    const onNoticeHandler = (channel, msgid, message) => {
        setAlertOptions({visibility: true, title: "Error", text: message})
    }

    // Bot functions
    const sendMessage = (message) => {
        if (bot && message.length > 0) {
            bot.send(message);
            setMessage("");
        } else console.warn("Message: Empty");
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <Text style={input.label}>Channel Name: {channel}</Text>
            <TextInput 
            style={[input.field, general.shadow]}
            onChangeText={setMessage}
            value={message}
            placeholder="Send a message"
            placeholderTextColor="#FFFFFF88"/>
            <Button title="Chat" onPress={() => sendMessage(message)}/>
            <AlertView
                options={alertOptions}
                setOptions={setAlertOptions}>
            </AlertView>
        </SafeAreaView>
        </DismissKeyboard>
    );
}