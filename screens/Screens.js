// TwitchBot
import { TWITCH_CLIENT_ID, TWITCH_REDIRECT_URI } from "@env";
import * as AuthSession from 'expo-auth-session';
import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AlertView from '../components/AlertView';
import { Background, BasicButton, DescriptiveInput, IconButton, Row, VisualButton } from '../components/Drawable';
import GridView from '../components/GridView';
import FireBase from '../utils/FireBase';


import ImagePicker from '../components/ImagePicker';
import { ControllerContext } from '../context/ControllerProvider';
import ChatBot from '../utils/chatbot';
import { general } from '../utils/styles';

// Twitch API
const TWITCH_SCOPES = ["chat:edit", "chat:read"];
const TWITCH_BASE_URL = "https://id.twitch.tv/oauth2/";
const TWITCH_AUTH_PATH = "authorize";
const TWITCH_VALID_PATH = "validate";

export const Splash = () => {
    return (
        <Background>
            <Image 
            source={require('../assets/streller.png')} 
            style={{
                width: '50%',
                height: 'auto',
                aspectRatio: 1,
            }}></Image>
        </Background>
    );
}

export const Welcome = ({ navigation }) => {
    return (
        <Background>
            <Text style={[general.title]}>Streller</Text>
            <BasicButton style={{ margin: '2%', width: 200 }} title="Login" onPress={() => navigation.navigate("Login")} />
            <BasicButton style={{ margin: '2%', width: 200 }} title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </Background>
    );
}

export const Login = ({ navigation }) => {
    const { updateUserInfo, updateUserID } = useContext(ControllerContext);

    const loginIn = () => {
        updateUserID('');
        updateUserInfo({ buttons: [], email: '', token: "2m9m5crfbuoptntx1jchdjrr65jocr" });
        navigation.navigate("Home");
    }

    return (
        <Background>
            <Text style={[general.title]}>Login</Text>
            <DescriptiveInput style={{ width: '75%' }} label="Email" placeholder="Enter your email" />
            <DescriptiveInput style={{ width: '75%' }} label="Password" placeholder="Enter your password" secure={true} />
            <BasicButton
                title="Login"
                style={{ marginTop: '4%', width: 200 }}
                onPress={loginIn} />
        </Background>
    );
}

export const SignUp = ({ navigation }) => {
    const { updateUserInfo, updateUserID } = useContext(ControllerContext);

    const signUp = () => {
        updateUserID('');
        updateUserInfo({ buttons: [], email: '', token: '' });
        navigation.navigate("Home");
    }

    return (
        <Background>
            <Text style={general.title}>Sign Up</Text>
            <DescriptiveInput style={{ width: '75%' }} label="Email" placeholder="Enter your email" />
            <DescriptiveInput style={{ width: '75%' }} label="Password" placeholder="Enter your password" secure={true} />
            <DescriptiveInput style={{ width: '75%' }} label="Confirm Password" placeholder="Re-enter your password" secure={true} />
            <BasicButton
                title="Sign Up"
                style={{ marginTop: '4%', width: 200 }}
                onPress={signUp} />
        </Background>
    );
}

export const Home = ({ navigation }) => {
    // State variables
    const [info, setInfo] = useState("");
    const [visibility, setVisibility] = useState(false);
    const { userInfo, updateUserInfo, updateUserID } = useContext(ControllerContext);

    // OnMount
    useEffect(() => {
        if (userInfo && userInfo.token !== '') validateToken(userInfo.token);
        else setInfo('Please connect your Twitch');
    }, []);

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
                    setInfo(json.login);
                    updateUserInfo({ buttons: userInfo.buttons, email: userInfo.email, token: access_token });
                }
            }).catch(() => { console.error(`An error occured while validating a token`); });
    }

    const twitchConnect = () => {
        if (userInfo.token === '') {
            setInfo('Fetching info...');
            authPrompt({ useProxy: true, TWITCH_REDIRECT_URI })
            .then((response) => {
                validateToken(response.authentication.accessToken);
            }).catch(() => { console.error('Error generating token') })
        } else {
            setInfo('Please connect your Twitch');
            updateUserInfo({ buttons: userInfo.buttons, email: userInfo.email, token: "" });
        }
    }

    const signOut = () => {
        setVisibility(false);
        updateUserInfo(null);
        updateUserID(null);
        navigation.navigate("Welcome");
    }

    const fb = new FireBase();

    return (
        <Background>
            <View style={[general.topRight]}>
                <Row style={{ top: '64%', right: '32%'}}>
                    {userInfo && userInfo.token === '' ? <IconButton
                        name="alert-circle"
                        size={32}
                        color={['#ff6961', '#565656']}
                        onPress={() => { setVisibility(true) }}>
                    </IconButton> : <View></View>}
                    <IconButton
                        name="apps"
                        size={32}
                        color={["#220942", "#6d5ba8"]}
                        onPress={() => { setVisibility(true) }}>
                    </IconButton>
                </Row>
            </View>
            <Row style={{ width: '75%' }}>
                <IconButton
                    name="play"
                    size={128}
                    color={["#2A89FF", "#2368DC"]}
                    onPress={() => navigation.navigate("Channel", { token: userInfo.token, username: info })}>
                </IconButton>
                <IconButton
                    name="color-palette"
                    size={128}
                    color={["#EE6181", "#eb456b"]}
                    onPress={() => navigation.navigate("EditController")}>
                </IconButton>
            </Row>
            <AlertView
                toggleVisibility={visibility}>
                <View style={[general.container, { width: '100%' }]}>
                    <Text style={[general.alertMessage, { textAlign: 'center' }]}>{info}</Text>
                    <Row style={{ width: '100%' }}>
                        <VisualButton
                            iconColor="#FFFFFF"
                            iconName="logo-twitch"
                            color={userInfo && userInfo.token === '' ? ["#80808066", "#565656"] : ["#6441a5", "#7e5cbd"]}
                            title={userInfo && userInfo.token === '' ? "Connect" : "Disconnect"}
                            onPress={twitchConnect}>
                        </VisualButton>
                        <VisualButton
                            style={{ flex: 1 }}
                            iconName="exit"
                            iconColor="#FFFFFF"
                            color={['#ff6961', '#565656']}
                            title="Logout"
                            onPress={signOut}>
                        </VisualButton>
                    </Row>
                    <BasicButton title="Close" containerStyle={{ width: '100%' }} onPress={() => setVisibility(false)} />
                </View>
            </AlertView>
        </Background>
    );
}

export const Channel = ({ route, navigation }) => {
    // State variables
    const [channel, setChannel] = React.useState("");
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState("");

    const showAlert = (message) => {
        setVisibility(true);
        setMessage(message);
        setChannel("");
    }

    // Confirm channel
    const confirm = () => {
        if (channel) {
            if (route.params.username && route.params.token) {
                navigation.navigate("Controller", {
                    token: route.params.token,
                    username: route.params.username,
                    channel: channel
                });
                setChannel("");
            } else showAlert("You do not have a Twitch account connected");
        } else showAlert("Channel name must not be empty");
    }

    return (
        <Background>
            <DescriptiveInput
                style={{ width: '75%' }}
                textAlign='center'
                label="Enter Twitch Channel"
                placeholder="Channel Name"
                text={channel}
                onChangeText={setChannel} />
            <BasicButton style={{ width: 200 }} title="Confirm" onPress={confirm} />
            <AlertView
                toggleVisibility={visibility}>
                <View style={[general.container, { width: '100%' }]}>
                    <Text style={general.alertTitle}>Warning</Text>
                    <Text style={general.alertMessage}>{message}</Text>
                    <BasicButton title="Close" style={{ width: 200 }} onPress={() => setVisibility(false)} />
                </View>
            </AlertView>
        </Background>
    );
}

export const Controller = ({ route, navigation }) => {
    // State variables
    const [bot, setBot] = useState(null);
    const [channel, setChannel] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState("");

    // OnBotUpdate
    useEffect(() => {
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
    useEffect(() => {
        if (route.params.channel) {
            setChannel(route.params.channel.toLowerCase());
            navigation.setOptions({ title: route.params.channel ? route.params.channel : "" })
            setBot(new ChatBot(route.params.username, route.params.token, onNoticeHandler));
        } else setChannel("");
    }, []);

    const showAlert = (message) => {
        setVisibility(true);
        setMessage(message);
    }

    // Bot event handler
    const onNoticeHandler = (channel, msgid, message) => {
        showAlert(message);
    }

    // Bot functions
    const sendMessage = (message) => {
        if (bot && message && message.length > 0) {
            bot.send(message);
        } else {
            showAlert('Invalid message.');
        }
    }

    return (
        <Background>
            <GridView
                onLongPress={() => { }}
                onPress={sendMessage}>
            </GridView>
            <AlertView
                toggleVisibility={visibility}>
                <View style={[general.container, { width: '100%' }]}>
                    <Text style={general.alertTitle}>Warning</Text>
                    <Text style={general.alertMessage}>{message}</Text>
                    <BasicButton title="Close" style={{ width: 200 }} onPress={() => setVisibility(false)} />
                </View>
            </AlertView>
        </Background>
    );
}

export const EditController = () => {
    const { userInfo, updateUserInfo } = useContext(ControllerContext);
    const [visibility, setVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [index, setIndex] = useState([]);

    // ID: [buttonID, subButtonID]
    const showAlert = (id) => {
        setIndex(id);
        setTitle(userInfo.buttons[id[0] - 1].titles[id[1]]);
        setMessage(userInfo.buttons[id[0] - 1].msg[id[1]]);
        setImage(userInfo.buttons[id[0] - 1].img[id[1]]);
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
                userInfo.buttons[index[0] - 1].img[index[1]] = image;
            }
            // Update button message
            if (message !== "") {
                userInfo.buttons[index[0] - 1].msg[index[1]] = message;
            }
            // Update button title
            if (title !== "") {
                userInfo.buttons[index[0] - 1].titles[index[1]] = title;
            }
            // Update button type
            if (type !== "") {
                if (type !== "delete") {
                    userInfo.buttons[index[0] - 1].type = type;
                } else {
                    // Remove button by index
                    userInfo.buttons.splice(index[0] - 1, 1);
                    // Re-calculate all buttons indexes
                    for (let i = 0; i < userInfo.buttons.length; i++) {
                        userInfo.buttons[i].id = i + 1;
                    }
                }
            }

            updateUserInfo(userInfo);
        }

        closeAlert();
    }

    return (
        <Background>
            <GridView
                onPress={() => { }}
                onLongPress={showAlert}>
            </GridView>
            <AlertView
                toggleVisibility={visibility}>
                <ImagePicker
                    size={'100%'}
                    image={image}
                    setImage={setImage} />
                <DescriptiveInput style={{ width: '75%' }} label="Title" placeholder={"Enter Button Title"} text={title} onChangeText={setTitle} />
                <DescriptiveInput style={{ width: '75%' }} label="Message" placeholder="Enter Button Output" text={message} onChangeText={setMessage} />
                <RadioButton.Group onValueChange={newValue => setType(newValue)} value={type}>
                    <Row style={{ width: '100%', padding: '4%' }}>
                        <View style={general.container}>
                            <Text style={{ color: '#a4c639', fontWeight: 'bold' }}>Small</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="small" />
                        </View>
                        <View style={general.container}>
                            <Text style={{ color: '#a4c639', fontWeight: 'bold' }}>Medium</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="medium" />
                        </View>
                        <View style={general.container}>
                            <Text style={{ color: '#a4c639', fontWeight: 'bold' }}>Large</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="large" />
                        </View>
                        <View style={general.container}>
                            <Text style={{ color: '#ff6961', fontWeight: 'bold' }}>Delete</Text>
                            <RadioButton uncheckedColor="#8c9eff" color='#f99e1a' value="delete" />
                        </View>
                    </Row>
                </RadioButton.Group>
                <Row style={{ width: '100%', justifyContent: 'space-evenly' }}>
                    <BasicButton title="Apply" style={{ width: 100 }} onPress={applyChanges} />
                    <BasicButton title="Close" style={{ width: 100 }} onPress={closeAlert} />
                </Row>
            </AlertView>
        </Background>
    );
}