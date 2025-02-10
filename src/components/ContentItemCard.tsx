// components/ContentItemCard.tsx
import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, GestureResponderEvent, Image, ActivityIndicator, } from 'react-native';
import { ContentItem } from '../slices/contentSlice';

interface ContentItemCardProps {
  item: ContentItem;
  onDelete?: (id: number) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const ContentItemCard: React.FC<ContentItemCardProps> = ({ item, onDelete, onPress }) => {
  // State to track whether the image is still loading.
  const [imageLoading, setImageLoading] = useState(true);

  const cardContent = (
    <View style={styles.card}>
      {item.image && (
        <View style={styles.thumbnailContainer}>
          {imageLoading && (
            <ActivityIndicator
              style={styles.imageLoader}
              size="small"
              color="#000"
            />
          )}
          <Image
            style={[styles.thumbnail, imageLoading && { display: 'none' }]}
            source={{ uri: item.image }}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
      </View>
      {onDelete && (
        <Pressable
          onPress={() => onDelete(item.id)}
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
  thumbnailContainer: {
    width: 60,
    height: 60,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  imageLoader: {
    position: 'absolute',
  },
  textContainer: {
    flex: 1,
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
    borderRadius: 20,
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

export default memo(ContentItemCard);
