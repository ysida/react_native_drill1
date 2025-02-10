// screens/ContentScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { ContentItem, fetchContent } from '../slices/contentSlice';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContentStackParamList } from '../navigation/ContentNavigator';
import { globalStyles } from '../styles/globalStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorWidget from '../components/ErrorWidget';
import ContentItemCard from '../components/ContentItemCard';

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
    <ContentItemCard item={item} onPress={() => navigation.navigate('ContentDetails', { item })} />
  );


  return (
    <View style={globalStyles.tabContainer}>
      <Text style={globalStyles.headerBold}>Content List</Text>
      {loading && <LoadingIndicator />}
      {error && <ErrorWidget error={error} onPress={() => { dispatch(fetchContent()) }} />}
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

export default ContentScreen;
