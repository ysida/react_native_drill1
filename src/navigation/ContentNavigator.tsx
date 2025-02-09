// navigation/ContentNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContentScreen from '../screens/ContentScreen';
import ContentDetailsScreen from '../screens/ContentDetailsScreen';
import { ContentItem } from '../components/ContentItemCard';

export type ContentStackParamList = {
  ContentList: undefined;
  ContentDetails: { item: ContentItem };
};

const Stack = createStackNavigator<ContentStackParamList>();

const ContentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContentList"
        component={ContentScreen}
        options={{ title: 'Content List' }}
      />

      <Stack.Screen
        name="ContentDetails"
        component={ContentDetailsScreen}
        options={{ title: 'Content Details' }}
      />

    </Stack.Navigator>
  );
};

export default ContentNavigator;
