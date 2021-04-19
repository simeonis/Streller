import React, {useState} from 'react';
import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { general, button } from '../assets/styles';
import * as AuthSession from 'expo-auth-session';
import DismissKeyboard from '../components/DismissKeyboard';
import GridView from '../components/GridView';
import AlertView from '../components/AlertView';
import {BasicButton,  BasicInput, IconButton, VisualButton } from '../components/Drawable';
import ImagePicker from '../components/ImagePicker';
import { useContext } from 'react';
import { ControllerContext } from '../context/ControllerProvider';

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

export const Welcome = ({route, navigation}) => {
    const {btnData, setBtnData} = useContext(ControllerContext);

    React.useEffect(() => {
        setBtnData([
            {type: 'small', id: '1', titles: ['1', '2', '3', '4'], msg: ['Hello', 'Bye', 'Salut', 'Okay']},
            {type: 'medium', id: '2', titles: ['1', '2'], msg: ['Hello', 'Bye']},
            {type: 'large', id: '3', titles: ['1'], msg: ['Hello']},
        ]);
    }, []);

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Welcome</Text>
            <BasicButton title="Login" width={200} onPress={() => navigation.navigate("Login")}/>
            <BasicButton title="Sign Up" width={200} onPress={() => navigation.navigate("SignUp")}/>
        </SafeAreaView>
    );
}

export const Login = ({route, navigation}) => {

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Login</Text>
            <Text>Username</Text>
            <BasicInput placeholder="Username"/>
            <Text>Password</Text>
            <BasicInput placeholder="Password" secure={true}/>
            <BasicButton 
                title="Login" 
                width={200} 
                style={{marginTop: 16}} 
                onPress={() => navigation.navigate("Twitch")}/>
        </SafeAreaView>
    );
}

export const SignUp = ({route, navigation}) => {

    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Sign Up</Text>
            <Text>Username</Text>
            <BasicInput placeholder="Username"/>
            <Text>Password</Text>
            <BasicInput placeholder="Password" secure={true}/>
            <Text>Confirm Password</Text>
            <BasicInput placeholder="Confirm Password" secure={true}/>
            <BasicButton 
                title="Sign Up" 
                width={200} 
                style={{marginTop: 16}} 
                onPress={() => navigation.navigate("Twitch")}/>
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
            <VisualButton
                iconName="logo-twitch" 
                iconColor="#FFFFFF"
                color={["#6441a5", "#7e5cbd"]}
                onPress={() => validateToken(TEMP_TOKEN)}
                title="Link Twitch Account">
            </VisualButton>
        </SafeAreaView>
    );
}

export const Home = ({route, navigation}) => {

    // State variables
    const [token, setToken] = useState("NULL");
    const [username, setUsername] = useState("NULL");

    // OnMount
    React.useEffect(() => {
        setToken(route.params.token ? route.params.token : "NULL");
        setUsername(route.params.username ? route.params.username : "NULL");
    }, []);

    return (
        <SafeAreaView style={general.container}>
            <View style={[general.shelf, {justifyContent: 'space-between'}, {width: '75%'}]}>
                <IconButton 
                    name="play" 
                    size={128} 
                    color={["#994d87", "#ad659c"]}
                    onPress={() => navigation.navigate("Channel", { token: token, username: username })}>
                </IconButton>
                <IconButton 
                    name="settings" 
                    size={128} 
                    color={["#514188", "#6d5ba8"]} 
                    onPress={() => navigation.navigate("EditController")}>
                </IconButton>
            </View>
            <View style={general.bottomTab}>
                <Text>Username: {username}</Text>
                <Text>Token: {token}</Text>
            </View>
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
            <Text>Enter Twitch Channel</Text>
            <BasicInput placeholder="Channel Name" text={channel} onChangeText={setChannel}/>
            <BasicButton title="Confirm" onPress={confirm}/>
        </SafeAreaView>
        </DismissKeyboard>
    );
}

export const Controller = ({route}) => {
    // State variables
    const [bot, setBot] = React.useState(null);
    const [channel, setChannel] = React.useState("");

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
        // setAlertOptions({visibility: true, title: "Error", text: message})
    }

    // Bot functions
    const sendMessage = (message) => {
        if (bot && message.length > 0) {
            bot.send(message);
        } else console.warn("Message: Empty");
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <GridView
                onPress={sendMessage}>
            </GridView>
        </SafeAreaView>
        </DismissKeyboard>
    );
}

export const EditController = () => {
    const [visibility, setVisibility] = useState(false);
    const [title, setTitle] = useState("Hello");

    const debugMessage = () => {
        console.log("Button pressed!")
    }

    const showAlert = (title) => {
        setVisibility(true);
        setTitle(title);
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <GridView
                onPress={(debugMessage)}
                onLongPress={showAlert}>
            </GridView>
            <AlertView
                toggleVisibility={visibility}>
                <Text>{title}</Text>
                <BasicInput placeholder="Channel Name"/>
                <BasicInput placeholder="Channel Name"/>
                <ImagePicker></ImagePicker>
                <BasicButton title="Close" width={200} onPress={() => setVisibility(false)}/>
            </AlertView>
        </SafeAreaView>
        </DismissKeyboard>
    );
}