// src/components/LoadingIndicator.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  color?: string;
  size?: 'small' | 'large' | number;
  style?: object;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color = '#0000ff',
  size = 'large',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
