import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';
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

  const config = {
    animation:'timing',
    config: {
      duration:300,
      easing:Easing.linear
    }
  }

  return (
    <ControllerProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#57199F', elevation: 0}, 
          headerTitleStyle: {color: '#add8e6'},
          headerTintColor: '#add8e6',
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          transitionSpec: {
            open:config,
            close:config
          }}}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }, {headerShown: false}} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }, {headerShown: false}} />
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
