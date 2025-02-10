import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../navigation/LoginNavigator';
import { globalStyles } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

type WelcomeScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (

    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default WelcomeScreen;
