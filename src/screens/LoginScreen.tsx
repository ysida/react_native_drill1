// src/screens/LoginScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../navigation/LoginNavigator';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginUser } from '../slices/authSlice';
import { globalStyles } from '../styles/globalStyles'; // Import your global styles
import { SafeAreaView } from 'react-native-safe-area-context';

type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error, userProfile } = useAppSelector((state) => state.auth);

  // Ref for the password input.
  const passwordInputRef = useRef<TextInput>(null);

  // Trigger login on button press or password submit.
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  // Show error notifications.
  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', error);
      }
    }
  }, [error]);

  // Notify on successful login.
  useEffect(() => {
    if (userProfile) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Login successful!');
      }
      // Optionally navigate to another screen here.
    }
  }, [userProfile]);

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <KeyboardAvoidingView
        style={globalStyles.container}  // Use the shared container style
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <Text style={globalStyles.title}>Login</Text>

        <TextInput
          style={[globalStyles.input, styles.inputCustom, loading && styles.inputDisabled]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
          // Using submitBehavior as needed (if supported)
          submitBehavior="submit"
        />

        <TextInput
          ref={passwordInputRef}
          style={[globalStyles.input, styles.inputCustom, loading && styles.inputDisabled]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Additional or component-specific styles can be defined here.
  inputCustom: {
    // For example, if you need to override or extend the global input style.
  },
  inputDisabled: {
    backgroundColor: '#e0e0e0',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});

export default LoginScreen;
