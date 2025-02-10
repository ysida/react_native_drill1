// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoginNavigator from './LoginNavigator';
import AuthorizedNavigator from './AuthorizedNavigator';

export type RootStackParamList = {
  Login: undefined;
  Authorized: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userProfile ? (
        <Stack.Screen name="Authorized" component={AuthorizedNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
