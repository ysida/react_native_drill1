// navigation/AuthorizedNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import ContentManagementScreen from '../screens/ContentManagementScreen';
import ContentNavigator from './ContentNavigator';

export type AuthorizedStackParamList = {
  UserProfile: undefined;
  ContentManagement: undefined;
  Content: undefined;
};

const Stack = createStackNavigator<AuthorizedStackParamList>();

const AuthorizedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />

      <Stack.Screen
        name="ContentManagement"
        component={ContentManagementScreen}
        options={{ title: 'Content Management' }}
      />

      <Stack.Screen
        name="Content"
        component={ContentNavigator}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};

export default AuthorizedNavigator;
