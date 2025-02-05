// components/ContentItemCard.tsx
import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export type ContentItem = {
  id: number;
  title: string;
  body: string;
};

interface ContentItemCardProps {
  item: ContentItem;
  onDelete: (id: number) => void;
}

const ContentItemCard: React.FC<ContentItemCardProps> = ({ item, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
      </View>
      <Pressable
        onPress={() => onDelete(item.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.buttonPressed,
        ]}
        accessibilityLabel="Delete item"
      >
        {/* You can replace the emoji with an Image component if you have an asset */}
        <Text style={styles.deleteIcon}>🗑</Text>
      </Pressable>
    </View>
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
    backgroundColor: '#e53935',
    borderRadius: 20, // Makes the button circular
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
    fontSize: 20,
    color: '#fff',
  },
});

// Use React.memo to avoid unnecessary re-renders if props do not change
export default memo(ContentItemCard);
