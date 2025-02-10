// navigation/AuthorizedNavigator.tsx
import React from 'react';
import ContentNavigator from './ContentNavigator';
import ContentManagementScreen from '../screens/ContentManagementScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type AuthorizedTabParamList = {
  Content: undefined;
  ContentManagement: undefined;
  UserProfile: undefined;
};

const Tab = createBottomTabNavigator<AuthorizedTabParamList>();

const AuthorizedNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Content"
        component={ContentNavigator}
        options={{
          title: 'Content',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ContentManagement"
        component={ContentManagementScreen}
        options={{ title: 'Content Management' }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: 'User Profile' }}
      />
    </Tab.Navigator>
  );
};

export default AuthorizedNavigator;
