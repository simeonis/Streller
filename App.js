import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

// Screens
import { Splash, Home, Twitch, Channel, Controller, Login, Welcome, SignUp, Controller1 } from './screens/Screens';

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const Stack = createStackNavigator();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash/>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{title: "Welcome"}}/>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: "Login"}}/>
        <Stack.Screen
        name="Twitch"
        component={Twitch}
        options={{title: "Twitch"}}/>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{title: "Home"}}/>
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: "Sign Up"}}/>
        <Stack.Screen
        name="Controller1"
        component={Controller1}
        options={{title: "Controller1"}}/>
        <Stack.Screen
        name="Channel"
        component={Channel}
        options={{title: "Streller"}}/>
        <Stack.Screen
        name="Controller"
        component={Controller}
        options={{title: "Streller"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
