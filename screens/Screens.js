// TwitchBot
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from "@env";
import * as AuthSession from 'expo-auth-session';
import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AlertView from '../components/AlertView';
import DismissKeyboard from '../components/DismissKeyboard';
import { BasicButton, DescriptiveInput, IconButton, Row, VisualButton } from '../components/Drawable';
import GridView from '../components/GridView';
import ImagePicker from '../components/ImagePicker';
import { ControllerContext } from '../context/ControllerProvider';
import ChatBot from '../utils/chatbot';
import { general } from '../utils/styles';

export const Splash = () => {
    return (
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Streller</Text>
        </SafeAreaView>
    );
}

export const Welcome = ({route, navigation}) => {
    return (
        <SafeAreaView style={[general.container]}>
            <Text style={[general.title]}>Streller</Text>
            <BasicButton style={{margin:'2%'}} title="Login" width={200} onPress={() => navigation.navigate("Login")}/>
            <BasicButton style={{margin:'2%'}} title="Sign Up" width={200} onPress={() => navigation.navigate("SignUp")}/>
        </SafeAreaView>
    );
}

export const Login = ({route, navigation}) => {
    const {setBtnData} = useContext(ControllerContext);

    const loginIn = () => {
        setBtnData({buttons: []});
        navigation.navigate("Twitch");
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <Text style={[general.title]}>Login</Text>
            <DescriptiveInput style={{width:'75%'}} label="Email" placeholder="Enter your email"/>
            <DescriptiveInput style={{width:'75%'}} label="Password" placeholder="Enter your password" secure={true}/>
            <BasicButton 
                title="Login" 
                width={200} 
                style={{marginTop: 16}} 
                onPress={loginIn}/>
        </SafeAreaView>
        </DismissKeyboard>
    );
}

export const SignUp = ({route, navigation}) => {
    const {setBtnData} = useContext(ControllerContext);

    const signUp = () => {
        setBtnData({buttons: []});
        navigation.navigate("Twitch");
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <Text style={general.title}>Sign Up</Text>
            <DescriptiveInput style={{width:'75%'}} label="Email" placeholder="Enter your email"/>
            <DescriptiveInput style={{width:'75%'}} label="Password" placeholder="Enter your password" secure={true}/>
            <DescriptiveInput style={{width:'75%'}} label="Confirm Password" placeholder="Re-enter your password" secure={true}/>
            <BasicButton 
                title="Sign Up" 
                width={200} 
                style={{marginTop: 16}} 
                onPress={signUp}/>
        </SafeAreaView>
        </DismissKeyboard>
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
            <Row style={{width:'75%'}}>
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
            </Row>
            <View style={general.bottomTab}>
                <Text style={{color:'#fff'}}>Username: {username}</Text>
                <Text style={{color:'#fff'}}>Token: {token}</Text>
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
            <DescriptiveInput style={{width:'75%'}} textAlign='center' label="Enter Twitch Channel" placeholder="Channel Name" text={channel} onChangeText={setChannel}/>
            <BasicButton width={'75%'} title="Confirm" onPress={confirm}/>
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
                onLongPress={() => {}}
                onPress={sendMessage}>
            </GridView>
        </SafeAreaView>
        </DismissKeyboard>
    );
}

export const EditController = () => {
    const {btnData, setBtnData} = useContext(ControllerContext);
    const [visibility, setVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [index, setIndex] = useState([]);

    // ID: [buttonID, subButtonID]
    const showAlert = (id) => {
        setIndex(id);
        setTitle(btnData.buttons[id[0]-1].titles[id[1]]);
        setMessage(btnData.buttons[id[0]-1].msg[id[1]]);
        setImage(btnData.buttons[id[0]-1].img[id[1]]);
        setVisibility(true);
    }

    const closeAlert = () => {
        setVisibility(false);
        setImage(null);
        setType("");
    }

    // Updates button data
    const applyChanges = () => {
        if (index && index.length > 0) {
            // Update button image
            if (image) {
                btnData.buttons[index[0]-1].img[index[1]] = image;
            }
            // Update button message
            if (message !== "") {
                btnData.buttons[index[0]-1].msg[index[1]] = message;
            }
            // Update button title
            if (title !== "") {
                btnData.buttons[index[0]-1].titles[index[1]] = title;
            }
            // Update button type
            if (type !== "") {
                if (type !== "delete") {
                    btnData.buttons[index[0]-1].type = type;
                } else {
                    // Remove button by index
                    btnData.buttons.splice(index[0]-1, 1);
                    // Re-calculate all buttons indexes
                    for (let i=0; i<btnData.buttons.length; i++) {
                        btnData.buttons[i].id = i+1;
                    }
                }
            }
        }

        closeAlert();
    }

    return (
        <DismissKeyboard>
        <SafeAreaView style={general.container}>
            <GridView
                onPress={() => {}}
                onLongPress={showAlert}>
            </GridView>
            <AlertView
                toggleVisibility={visibility}>
                <ImagePicker
                    size={'100%'}
                    image={image} 
                    setImage={setImage}/>
                <DescriptiveInput  style={{width: '75%'}} label="Title" placeholder={"Enter Button Title"} text={title} onChangeText={setTitle}/>
                <DescriptiveInput style={{width: '75%'}} label="Message" placeholder="Enter Button Output" text={message} onChangeText={setMessage}/>
                <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
                    <Row style={{width: '100%', padding:'4%'}}>
                        <View style={general.container}>
                            <Text style={{color:'#a4c639', fontWeight: 'bold'}}>Small</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="small" />
                        </View>
                        <View style={general.container}>
                            <Text style={{color:'#a4c639', fontWeight: 'bold'}}>Medium</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="medium" />
                        </View>
                        <View style={general.container}>
                            <Text style={{color:'#a4c639', fontWeight: 'bold'}}>Large</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="large" />
                        </View>
                        <View style={general.container}>
                            <Text style={{color:'#ff6961', fontWeight: 'bold'}}>Delete</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="delete" />
                        </View>
                    </Row>
                </RadioButton.Group>
                <Row style={{width:'100%'}}>
                <BasicButton title="Apply" width={'46%'} onPress={applyChanges}/>
                <BasicButton title="Close" width={'46%'} onPress={closeAlert}/>
                </Row>
            </AlertView>
        </SafeAreaView>
        </DismissKeyboard>
    );
}