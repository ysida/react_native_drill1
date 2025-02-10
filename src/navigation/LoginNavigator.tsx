// navigation/LoginNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';

export type LoginStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
