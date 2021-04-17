import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

// Screens
import { Splash, Home, Twitch, Channel, Controller, Login, Welcome, SignUp, EditController } from './screens/Screens';
import NavBarEditController from './components/NavBarEditController';

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }} />
        <Stack.Screen
          name="Twitch"
          component={Twitch}
          options={{ title: "Twitch" }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign Up" }} />
        <Stack.Screen
          name="Channel"
          component={Channel}
          options={{ title: "Streller" }} />
        <Stack.Screen
          name="Controller"
          component={Controller}
          options={
            { title: "Controller" }} />
        <Stack.Screen
          name="EditController"
          component={EditController}
          options={
            { headerTitle: props => <NavBarEditController>{props, { title: "Edit" }}</NavBarEditController> }
          } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
