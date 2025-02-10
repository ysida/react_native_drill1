// screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { globalStyles } from '../styles/globalStyles';

const UserProfileScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{ ...globalStyles.tabContainer, ...styles.containerCenter }}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,               // Fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
    backgroundColor: '#f9f9f9', // Optional: set a background color
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default UserProfileScreen;
