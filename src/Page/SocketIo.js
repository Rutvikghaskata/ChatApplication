import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
const Socket_URL = 'http://192.168.1.147:5000';
const socket = socketIOClient(Socket_URL);

const SocketIo = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = 'rutvik';
  var currentdate = new Date();
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}`;
  const [reaction,setReaction] = useState([{user:'rutvik',react:'like'}])

  const sendMessage = async() => {
    setMessage('')
    const data = {
      UserName: user,
      Message: message,
      Time: time,
      Reaction:[{user:'rutvik',react:'like'}]
    };
    console.log(data)
    await fetch('http://192.168.1.147:5000/message',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    socket.emit('message')
  };

  useEffect(() => {
    try {
      socket.connect();
      socket.emit('message')
      console.log(socket)
      socket.on('message', chat => {
       setMessages(chat)
      });
      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.log('socket eror',error);
    }
  }, []);
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        SocketIo
      </Text>
      <ScrollView style={{height: 300}}>
        {messages.length > 0 &&
          messages.map((item, index) => {
            return (
               <View key={index}>
                <Text style={{color:'#000'}}>{item.Message}</Text>
                <Text style={{color:'#000'}}>{item.Time}</Text>
              </View>
            );
          })}
      </ScrollView>
      <View style={{backgroundColor: '#ccc', padding: 10}}>
        <TextInput
          value={message}
          placeholder="Enter message"
          onChangeText={event => setMessage(event)}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{backgroundColor: 'blue', padding: 10}}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            send message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocketIo;
