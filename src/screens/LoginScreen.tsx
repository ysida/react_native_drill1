import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../navigation/LoginNavigator';
import { useAppDispatch, useAppSelector } from '../hooks'; // Use your typed hooks
import { loginUser } from '../slices/authSlice';

type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Separate state for email and password.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error, userProfile } = useAppSelector((state) => state.auth);

  // Handle login button press.
  const handleLogin = () => {
    // Dispatch the async login thunk.
    dispatch(loginUser({ email, password }));
  };

  // Show toast alerts when there's an error or on successful login.
  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', error);
      }
    }
  }, [error]);

  useEffect(() => {
    if (userProfile) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Login successful!');
      }
      // Optionally navigate to another screen upon successful login.
    }
  }, [userProfile]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[styles.input, loading && styles.inputDisabled]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, loading && styles.inputDisabled]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
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
  inputDisabled: {
    backgroundColor: '#e0e0e0',
  },
  loader: {
    marginVertical: 20,
  },
});

export default LoginScreen;
