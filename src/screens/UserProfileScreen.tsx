// screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthorizedStackParamList } from '../navigation/AuthorizedNavigator';
import { globalStyles } from '../styles/globalStyles';

type UserProfileScreenNavigationProp = StackNavigationProp<AuthorizedStackParamList, 'UserProfile'>;

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
      <Text style={globalStyles.title}>User Profile</Text>
      {userProfile && <Text style={globalStyles.subTitle}>Welcome, {userProfile.name}!</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Go to Content" onPress={() => navigation.navigate('Content')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Content Management" onPress={() => navigation.navigate('ContentManagement')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  buttonContainer: {
    marginVertical: 8, // This adds vertical spacing between buttons
    width: '80%',     // Adjust width as needed
  },
});

export default UserProfileScreen;
