import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = `http://192.168.1.68:5000`;

const ChatList = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const handleLogout =async () =>{
    await AsyncStorage.clear()
    navigation.navigate('login')
  }

  useEffect(() => {
    try {
      axios
        .get(`${api}/users`)
        .then(res => {
          console.log('res.data', res.data);
          setUsers(res.data);
        })
        .catch(err => {
          console.log(err.message);
          Alert.alert(err.message);
          return err;
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center',}}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{color: 'black'}}>Logout</Text>
      </TouchableOpacity>
      <View style={{marginTop:50}}>
      {users.map((data, index) => {
        return (
          <View key={index}>
            <TouchableOpacity onPress={()=>{navigation.navigate('chat',data)}}>
            <Text style={{color: 'black'}}>{data.name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      </View>
    </View>
  );
};

export default ChatList;
