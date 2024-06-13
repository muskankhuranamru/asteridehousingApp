import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Header from '../components/Header';
import {Colors, Fontsize, Spacing, Typography} from '../theme';
import axiosInstance from '../utils/axiosInstance';

type Home = {
  id: string;
  address: string;
  description: string;
  imageSource: string;
  heading: string;
  subHeading: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [homes, setHomes] = useState<Home[]>([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axiosInstance.get('/homes');
        setHomes(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to fetch homes. Please try again later.');
      }
    };
    fetchHomes();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="Home Screen" showBackButton={false} />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: Spacing.medium}}
        data={homes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate('Details', {home: item})}>
            <Image
              source={require('../assets/images/house1.png')}
              style={styles.image}
            />
            <View style={styles.cardBody}>
              <Text style={styles.cardHeading}>{item.heading}</Text>
              <Text>{item.subHeading}</Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={[styles.cardPinkText]}>See more</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.description}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingBottom: Spacing.mid,
  },
  cardContainer: {
    width: '100%',
    marginTop: Spacing.mid,
    borderRadius: Spacing.borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: 'lightblue',
  },
  cardBody: {
    padding: Spacing.medium,
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
  },
  cardPinkText: {
    fontFamily: Typography.SemiBold,
    color: Colors.primary,
    fontSize: Fontsize.smText,
  },
  cardButton: {
    padding: Spacing.xsmall,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: Spacing.borderRadius,
    marginTop: Spacing.mid,
    width: '93%',
    alignSelf: 'center',
  },
  description: {
    fontSize: Fontsize.subHeading,
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default HomeScreen;
