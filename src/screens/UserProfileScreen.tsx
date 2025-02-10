// screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../styles/globalStyles';
import { AuthorizedTabParamList } from '../navigation/AuthorizedNavigator';

type UserProfileScreenNavigationProp = StackNavigationProp<AuthorizedTabParamList, 'UserProfile'>;

type Props = {
  navigation: UserProfileScreenNavigationProp;
};

const UserProfileScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={globalStyles.title}>User Profile</Text>
        {userProfile && <Text style={globalStyles.subTitle}>Welcome, {userProfile.name}!</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Content')}>
            <Text style={styles.navButtonText}>Go to Content</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContentManagement')}>
            <Text style={styles.navButtonText}>Go to Content Management</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout button positioned at the bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 60, // Added top margin to push content down
  },
  buttonContainer: {
    marginVertical: 8,
    width: '80%',
  },
  navButton: {
    backgroundColor: '#4c669f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutContainer: {
    alignItems: 'center',
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
