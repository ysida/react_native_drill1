// screens/ContentManagementScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, deleteContentItem } from '../slices/contentSlice';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthorizedStackParamList } from '../navigation/AuthorizedNavigator';

type ContentManagementScreenNavigationProp = StackNavigationProp<AuthorizedStackParamList, 'ContentManagement'>;

type Props = {
  navigation: ContentManagementScreenNavigationProp;
};

const ContentManagementScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteContentItem(id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.body}</Text>
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Content Management</Text>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error: {error}</Text>}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <Button title="Go to Content List" onPress={() => navigation.navigate('Content')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  card: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});

export default ContentManagementScreen;
