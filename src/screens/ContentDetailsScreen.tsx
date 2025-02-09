// screens/ContentDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ContentStackParamList } from '../navigation/ContentNavigator';

type ContentDetailsScreenRouteProp = RouteProp<ContentStackParamList, 'ContentDetails'>;

type Props = {
  route: ContentDetailsScreenRouteProp;
};

const ContentDetailsScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  // In a real app, you might fetch more details using the id.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Content Details</Text>
      <Text>Content ID: {item.id}</Text>
      <Text>Title: {item.title}</Text>
      <Text>Body: {item.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});

export default ContentDetailsScreen;
