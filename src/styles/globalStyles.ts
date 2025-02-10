// src/styles/globalStyles.ts
import { ActivityIndicator, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Shared title style used across multiple pages
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  subTitle: {
    fontSize: 24,
    marginBottom: 30,
    color: '#555',
  },
  header:
  {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  headerBold: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  activityIndicator: {
    height: '35%',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff', // or your background color
  },

});
