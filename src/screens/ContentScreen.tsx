// screens/ContentScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { fetchContent } from '../slices/contentSlice';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContentStackParamList } from '../navigation/ContentNavigator';
import { ContentItem } from '../components/ContentItemCard';
import { globalStyles } from '../styles/globalStyles';
import LoadingIndicator from '../components/LoadingIndicator';

type ContentScreenNavigationProp = StackNavigationProp<ContentStackParamList, 'ContentList'>;

type Props = {
  navigation: ContentScreenNavigationProp;
};

const ContentScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (!data) {
      dispatch(fetchContent());
    }
  }, [dispatch, data]);

  const renderItem = ({ item }: { item: ContentItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ContentDetails', { item })} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={globalStyles.header}>Content List</Text>
      {loading && <LoadingIndicator />}
      {error && <Text>Error: {error}</Text>}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});

export default ContentScreen;
