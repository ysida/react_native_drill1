// src/components/ErrorWidget.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorWidgetProps {
  error: string;
  onPress?: () => void;
}

const ErrorWidget: React.FC<ErrorWidgetProps> = ({ error, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: {error}</Text>
      {onPress && <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007aff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ErrorWidget;
