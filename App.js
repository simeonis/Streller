import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavBarEditController from './components/NavBarEditController';
import { ControllerProvider } from './context/ControllerProvider';
import { Channel, Controller, EditController, Home, Login, SignUp, Splash, Twitch, Welcome } from './screens/Screens';


export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const Stack = createStackNavigator();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <ControllerProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#28143b', elevation: 0}, 
          headerTitleStyle: {color: '#add8e6'},
          headerTintColor: '#add8e6'}}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }, {headerShown: false}} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }, {headerShown: false}} />
        <Stack.Screen
          name="Twitch"
          component={Twitch}
          options={{ title: "Twitch" }, {headerShown: false}} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }, {headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign Up" }, {headerShown: false}} />
        <Stack.Screen
          name="Channel"
          component={Channel}
          options={{ title: "" }} />
        <Stack.Screen
          name="Controller"
          component={Controller}
          options={
            { title: "" }} />
        <Stack.Screen
          name="EditController"
          component={EditController}
          options={
            { headerTitle: props => <NavBarEditController>{props, { title: "Customize" }}</NavBarEditController> }
          } />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style='light'></StatusBar>
    </ControllerProvider>
  );
}

const styles = StyleSheet.create({});
