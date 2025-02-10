// navigation/AuthorizedNavigator.tsx
import React from 'react';
import { Text } from 'react-native';
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // Use a function to set an emoji icon for each tab.
        tabBarIcon: ({ size }) => {
          let emoji = '';
          if (route.name === 'Content') {
            emoji = '📄';
          } else if (route.name === 'ContentManagement') {
            emoji = '🗄️';
          } else if (route.name === 'UserProfile') {
            emoji = '👤';
          }
          return <Text style={{ fontSize: size }}>{emoji}</Text>;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Content"
        component={ContentNavigator}
        options={{ title: 'Content' }}
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
