import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {AppProvider} from './src/context/AppContext';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Home: undefined;
  Details: {home: Home};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Splash');
  useEffect(() => {
    const fetchInitialRoute = async () => {
      try {
        const savedRoute = await AsyncStorage.getItem('initialRoute');
        setInitialRoute((savedRoute as keyof RootStackParamList) || 'Splash');
      } catch (error) {
        console.error('Error fetching initial route:', error);
        setInitialRoute('Splash');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialRoute();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token === 'dummy-token') {
          setInitialRoute('Home'); // If token exists, set initial route to Home
        } else {
          setInitialRoute('Splash'); // If no token, set initial route to Login
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setInitialRoute('Splash');
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const saveInitialRoute = async () => {
      try {
        await AsyncStorage.setItem('initialRoute', initialRoute);
      } catch (error) {
        console.error('Error saving initial route:', error);
      }
    };

    saveInitialRoute();
  }, [initialRoute]);

  if (isLoading) {
    return null;
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={initialRoute}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
