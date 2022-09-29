import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';

const SplashScreen = ({navigation}) => {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.navigate('home');
      } else {
        navigation.navigate('login');
      }
    } catch (e) {
      console.log('error in splash screen');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);
  return (
    <LinearGradient
      colors={['#28056a', '#872ba3']}
      style={styles.linearGradient}>
      <Lottie source={require('../assets/json/splash.json')} autoPlay loop />
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    opacity: 1,
  },
});
