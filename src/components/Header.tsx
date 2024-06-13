import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fontsize, Spacing, Typography} from '../theme';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showBackButton = true}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Image
            source={require('../assets/images/backArrow.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingHorizontal: Spacing.medium,
  },
  backButton: {},
  backIcon: {
    width: 20,
  },
  title: {
    fontFamily: Typography.bold,
    textAlign: 'center',
    color: Colors.black,
    fontSize: Fontsize.subHeading,
    flex: 1,
  },
});

export default Header;
