// navigation/ContentNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContentScreen from '../screens/ContentScreen';
import ContentDetailsScreen from '../screens/ContentDetailsScreen';
import { ContentItem } from '../slices/contentSlice';

export type ContentStackParamList = {
  ContentList: undefined;
  ContentDetails: { item: ContentItem };
};

const Stack = createNativeStackNavigator<ContentStackParamList>();

const ContentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen
        name="ContentList"
        component={ContentScreen}
        options={{ title: 'Content List' }}
      />
      <Stack.Screen
        name="ContentDetails"
        component={ContentDetailsScreen}
        options={{
          title: 'Content Details',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default ContentNavigator;
