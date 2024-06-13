import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Colors, Fontsize, Spacing, Typography} from '../theme';
import {useAppContext} from '../context/AppContext';
import Header from '../components/Header';
import PushNotification from 'react-native-push-notification';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({route}) => {
  const {home} = route.params;
  const {
    state: {userLocation},
    setUserLocation,
  } = useAppContext();
  const [isNearby, setIsNearby] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationUpdated, setLocationUpdated] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const distance = getDistance(userLocation.coords, home.location);
      setIsNearby(distance <= 35);
      setIsLoading(false);
    }
  }, [userLocation, locationUpdated]);

  const getDistance = (
    loc1: {latitude: number; longitude: number},
    loc2: {latitude: number; longitude: number},
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(loc1.latitude);
    const φ2 = toRad(loc2.latitude);
    const Δφ = toRad(loc2.latitude - loc1.latitude);
    const Δλ = toRad(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleUnlock = async () => {
    if (!userLocation) {
      Alert.alert('Please enable location services to unlock.');
      return;
    }

    const distance = getDistance(userLocation.coords, home.location);

    if (distance <= 35) {
      try {
        const response = await axios.post('http://192.168.1.34:3000/unlocks', {
          homeId: home.id,
          timestamp: new Date().toISOString(),
        });

        if (response.status === 201) {
          Alert.alert('Success', response.data.message);
          PushNotification.localNotification({
            channelId: 'your-channel-id', // Make sure the channel ID exists
            title: 'Home Unlocked',
            message: 'Your home has been successfully unlocked.',
            playSound: true,
            soundName: 'default',
            importance: 'high',
            priority: 'high',
          });
        } else {
          Alert.alert('Error', response.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to unlock the home.');
      }
    } else {
      Alert.alert('You are too far from the home to unlock it.');
    }
  };

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        if (setUserLocation) {
          setUserLocation(prevState => ({
            ...prevState,
            userLocation: position,
          }));
          setLocationUpdated(true);
        }
      },
      error => {
        console.error(error);
        setError('Failed to retrieve location');
        setIsLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text>{error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestLocationPermission}>
          <Text style={styles.description}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Details Screen" showBackButton={true} />
      <Image
        source={require('../assets/images/house1.png')}
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.cardHeading}>{home.heading}</Text>
        <Text style={styles.cardSubHeading}>{home.subHeading}</Text>
        <Text style={styles.cardSubHeading}>{home.address}</Text>
        <Text style={styles.cardSubHeading}>{home.description}</Text>

        {isNearby && (
          <TouchableOpacity style={styles.button} onPress={handleUnlock}>
            <Text style={styles.description}>Unlock</Text>
          </TouchableOpacity>
        )}

        {!userLocation && (
          <TouchableOpacity
            style={styles.button}
            onPress={requestLocationPermission}>
            <Text style={styles.description}>Enable Location</Text>
          </TouchableOpacity>
        )}

        {userLocation && !isNearby && (
          <Text style={styles.cardHeading}>
            You are{' '}
            {Math.round(getDistance(userLocation.coords, home.location))} meters
            away from the home.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: Spacing.medium,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: 'lightblue',
  },
  cardHeading: {
    fontFamily: Typography.bold,
    color: Colors.black,
    fontSize: Fontsize.heading,
    marginBottom: Spacing.xsmall,
  },
  cardSubHeading: {
    fontFamily: Typography.SemiBold,
    color: Colors.darkGrey,
    fontSize: Fontsize.subHeading,
    marginBottom: Spacing.xsmall,
    textAlign: 'justify',
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

export default DetailsScreen;
