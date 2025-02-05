// screens/ContentManagementScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { fetchContent, deleteContentItem } from '../slices/contentSlice';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthorizedStackParamList } from '../navigation/AuthorizedNavigator';
import ContentItemCard, { ContentItem } from '../components/ContentItemCard';

type ContentManagementScreenNavigationProp = StackNavigationProp<AuthorizedStackParamList, 'ContentManagement'>;

type Props = {
  navigation: ContentManagementScreenNavigationProp;
};

const ContentManagementScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.content);

  // Local state to track pull-to-refresh status
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchContent()).finally(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    // Initial fetch when the component mounts
    dispatch(fetchContent());
  }, [dispatch]);

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteContentItem(id));
  }, [dispatch]);

  const renderItem = useCallback(({ item }: { item: ContentItem }) => (
    <ContentItemCard item={item} onDelete={handleDelete} />
  ), [handleDelete]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Content Management</Text>
      {loading && !refreshing && <ActivityIndicator size="large" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.bottomButtonContainer}>
        <Button title="Go to Content List" onPress={() => navigation.navigate('Content')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  bottomButtonContainer: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default ContentManagementScreen;
