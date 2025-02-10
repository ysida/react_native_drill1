// src/screens/ContentManagementScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ToastAndroid,
  Platform,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { fetchContent, deleteContentItem } from '../slices/contentSlice';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import ContentItemCard, { ContentItem } from '../components/ContentItemCard';
import { globalStyles } from '../styles/globalStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import { AuthorizedTabParamList } from '../navigation/AuthorizedNavigator';

type ContentManagementScreenNavigationProp = StackNavigationProp<AuthorizedTabParamList, 'ContentManagement'>;

type Props = {
  navigation: ContentManagementScreenNavigationProp;
};

const ContentManagementScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.content);
  const [refreshing, setRefreshing] = useState(false);
  // State to track which item is being considered for deletion.
  const [itemToDelete, setItemToDelete] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', error);
      }
    }
  }, [error]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchContent()).finally(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    // Initial fetch when the component mounts
    dispatch(fetchContent());
  }, [dispatch]);

  // Function to confirm deletion.
  const handleConfirmDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch(deleteContentItem(itemToDelete.id));
      setItemToDelete(null);
    }
  }, [dispatch, itemToDelete]);

  // Function to cancel deletion.
  const handleCancelDelete = useCallback(() => {
    setItemToDelete(null);
  }, []);

  // Instead of directly deleting, we now trigger the modal.
  const renderItem = useCallback(
    ({ item }: { item: ContentItem }) => (
      <ContentItemCard
        item={item}
        onDelete={() => setItemToDelete(item)}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerBold}>Content Management</Text>
      {loading && !refreshing && <LoadingIndicator />}
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContent}
      />

      {/* <View style={styles.bottomButtonContainer}>
        <Button title="Go to Content List" onPress={() => navigation.navigate('Content')} />
      </View> */}

      {/* Confirmation Modal */}
      {itemToDelete && (
        <Modal
          transparent
          animationType="fade"
          visible={true}
          onRequestClose={handleCancelDelete}
        >
          <TouchableWithoutFeedback onPress={handleCancelDelete}>
            <View style={modalStyles.backdrop}>
              <TouchableWithoutFeedback>
                <View style={modalStyles.modalContent}>
                  <Text style={modalStyles.modalTitle}>Confirm Delete</Text>
                  <Text style={modalStyles.modalMessage}>
                    Are you sure you want to delete this item? This action cannot be undone.
                  </Text>
                  <View style={modalStyles.modalButtons}>
                    <TouchableOpacity style={modalStyles.confirmButton} onPress={handleConfirmDelete}>
                      <Text style={modalStyles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancelDelete}>
                      <Text style={modalStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    paddingBottom: 20,
  },
  bottomButtonContainer: {
    marginTop: 8,
  },
});

export default ContentManagementScreen;
