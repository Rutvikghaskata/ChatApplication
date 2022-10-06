import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Button from '../../component/Button';
import axios from 'axios';
const api = `http://192.168.1.68:5000`;

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [focused, setFocused] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [animation, setAnimation] = useState('flipInX');

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${api}/user/signin`, data)
      .then(res => {
        console.log(res.data);
        const data = res.data;
        const value = AsyncStorage.setItem('token', data.token);
        navigation.navigate('home');
      })
      .catch(err => {
        Alert.alert(err.message);
        return err;
      });
  };

  const resetPage = () => {
    setEmail('');
    setEmailError('');
    setFocused(null);
    setPassword('');
    setPasswordError('');
    setAnimation('flipInX');
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#28056a', '#872ba3']}
        style={styles.linearGradient}>
        <Animatable.View style={styles.container} animation={animation}>
          <Text style={styles.headText}>Login</Text>
          <TextInput
            placeholder="email"
            placeholderTextColor="#ccc"
            onChangeText={text => setEmail(text)}
            style={[
              styles.input,
              {
                borderColor:
                  focused === 1 ? '#28056a' : emailError ? 'red' : '#eee',
              },
            ]}
            onFocus={() => setFocused(1)}
          />
          {emailError ? (
            <View style={styles.errorContainer}>
              <Text style={{color: 'white', fontSize: 13}}>{emailError}</Text>
            </View>
          ) : null}
          <TextInput
            placeholder="password"
            placeholderTextColor="#ccc"
            onChangeText={text => setPassword(text)}
            style={[
              styles.input,
              {
                borderColor:
                  focused === 2 ? '#28056a' : passwordError ? 'red' : '#eee',
              },
            ]}
            onFocus={() => setFocused(2)}
          />
          {passwordError ? (
            <View style={styles.errorContainer}>
              <Text style={{color: 'white', fontSize: 13}}>
                {passwordError}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              width: '80%',
              marginTop: 40,
              marginBottom: 10,
              paddingVertical: 10,
            }}>
            <Button value="Login" onSubmit={handleSubmit} />
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#ccc', fontWeight: '600', marginRight: 5}}>
                Don't have account ?
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setAnimation('flipOutX');
                  setTimeout(() => {
                    resetPage, setAnimation('flipInX');
                    navigation.navigate('register');
                  }, 1000);
                }}>
                <Text style={{color: '#28056a', fontWeight: '700'}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 10,
    alignItems: 'center',
  },
  headText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28056a',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    marginTop: 20,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
    color: '#28056a',
  },
  errorContainer: {
    height: 30,
    marginLeft: '10%',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#d0112b',
    shadowColor: 'red',
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 10,
  },
});
