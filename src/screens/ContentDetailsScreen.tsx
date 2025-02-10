// screens/ContentDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ContentStackParamList } from '../navigation/ContentNavigator';

type ContentDetailsScreenRouteProp = RouteProp<ContentStackParamList, 'ContentDetails'>;

type Props = {
  route: ContentDetailsScreenRouteProp;
};

const ContentDetailsScreen: React.FC<Props> = ({ route }) => {
  const { item } = route.params;
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.image && (
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator style={styles.imageLoader} size="large" color="#000" />
          )}
          <Image
            source={{ uri: item.image }}
            style={[styles.bannerImage, imageLoading && { opacity: 0 }]}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Content ID:</Text>
        <Text style={styles.infoValue}>{item.id}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // Adjusting transform to center the loader (assuming loader size around 30)
    transform: [{ translateX: -15 }, { translateY: -15 }],
    zIndex: 1,
  },
  infoContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default ContentDetailsScreen;
