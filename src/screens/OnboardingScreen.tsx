import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {Colors, Fontsize, Spacing, Typography} from '../theme';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/findhome.jpg')}
      />
      <Text style={[styles.text, {fontSize: Fontsize.largeHeading}]}>
        Welcome to House Unlock App
      </Text>
      <Text style={[styles.text, {fontSize: Fontsize.subHeading}]}>
        This app allows you to view and unlock homes nearby.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')}>
        <Text style={styles.description}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.medium,
    backgroundColor: Colors.white,
  },
  text: {
    marginBottom: Spacing.mid,
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.black,
  },
  description: {
    fontSize: Fontsize.subHeading,
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: Spacing.borderRadius,
    marginTop: Spacing.mid,
    width: '100%',
  },
  image: {marginBottom: Spacing.xxlarge},
});

export default OnboardingScreen;
