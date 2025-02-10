// navigation/AuthorizedNavigator.tsx
import React from 'react';
import ContentNavigator from './ContentNavigator';
import UserProfileScreen from '../screens/UserProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContentManagementScreen from '../screens/ContentManagementScreen';

export type AuthorizedTabParamList = {
  Content: undefined;
  ContentManagement: undefined;
  UserProfile: undefined;
};

const Tab = createBottomTabNavigator<AuthorizedTabParamList>();

const AuthorizedNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, }}>
      <Tab.Screen
        name="Content"
        component={ContentNavigator}
        options={{
          title: 'Content',
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
