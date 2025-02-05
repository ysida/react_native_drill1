// screens/UserProfileScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthorizedStackParamList } from '../navigation/AuthorizedNavigator';

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
      <Text style={styles.title}>User Profile</Text>
      {userProfile && <Text>Welcome, {userProfile.name}!</Text>}
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Go to Content Management" onPress={() => navigation.navigate('ContentManagement')} />
      <Button title="Go to Content" onPress={() => navigation.navigate('Content')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default UserProfileScreen;
