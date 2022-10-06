import React from 'react';
import {
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  HomeScreen,
  ChatScreen
} from './src/router';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar backgroundColor="#28056a" />
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="chat" component={ChatScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;