import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {Colors, Fontsize, Spacing, Typography} from '../theme';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (username === 'admin' && password === 'password') {
      await AsyncStorage.setItem('token', 'dummy-token');

      navigation.replace('Home');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={Colors.black}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.black}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.description}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    marginBottom: Spacing.mid,
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.black,
    fontSize: Fontsize.heading,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey,
    padding: Spacing.small,
    marginBottom: Spacing.mid,
    borderRadius: Spacing.borderRadius,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: Spacing.borderRadius,
    marginTop: Spacing.mid,
    width: '100%',
  },
  description: {
    fontSize: Fontsize.subHeading,
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default LoginScreen;
