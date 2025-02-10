// components/ContentManagementItemCard.tsx
import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { ContentItem } from '../slices/contentSlice';


interface ContentManagementItemCardProps {
  item: ContentItem;
  onDelete?: ((id: number) => void);
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
}

const ContentManagementItemCard: React.FC<ContentManagementItemCardProps> = ({ item, onDelete, onPress }) => {
  const cardContent = (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {onDelete && (
        <Pressable
          onPress={() => onDelete?.(item.id)}
          style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
          accessibilityLabel="Delete item"
        >
          <Text style={styles.deleteIcon}>🗑</Text>
        </Pressable>
      )}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      {cardContent}
    </TouchableOpacity>
  ) : (
    cardContent
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 20, // Makes the button circular
    borderWidth: 0.1,
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  deleteIcon: {
    fontSize: 18,
    color: '#ff0000',
  },
});

// Use React.memo to avoid unnecessary re-renders if props do not change
export default memo(ContentManagementItemCard);
