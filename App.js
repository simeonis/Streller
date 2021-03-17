import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

// Screens
import { Splash, Home, Twitch } from './screens/Screens';

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
        name="Twitch"
        component={Twitch}
        options={{title: "Twitch"}}/>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{title: "Home"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
