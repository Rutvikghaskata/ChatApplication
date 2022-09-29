import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Linking,
  Image,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ChatData} from '../JsonData/fakeData';
import * as Animatable from 'react-native-animatable';
import socketIOClient from 'socket.io-client';
const Socket_URL = 'http://192.168.1.147:5000';
const socket = socketIOClient(Socket_URL);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function isValidHttpUrl(s) {
  let url;
  try {
    url = new URL(s);
  } catch (e) {
    return false;
  }
  return /https?/.test(url);
}

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [key, setKey] = useState();
  const [show, setShow] = useState(false);

  const sendMessage = async() => {
    setMessage('')
    const data = {
      UserName: user,
      Message: message,
      Time: time,
      Reaction:[{user:'rutvik',react:'like'}]
    };
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
    <KeyboardAvoidingView style={{flex:1}}>
      <StatusBar backgroundColor="#28056a" />
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#28056a', '#872ba3']}
          style={styles.linearGradient}>
          <View
            style={{
              position: 'absolute',
              height: 55,
              top: 0,
              paddingHorizontal: 20,
              width: windowWidth,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 100,
              backgroundColor: '#28056a',
            }}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: 'Quicksand-SemiBold',
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.Container}>
            <ScrollView
              style={{marginTop: 40}}
              showsVerticalScrollIndicator={false}>
              {ChatData.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{position: 'relative'}}
                    key={index}
                    activeOpacity={1}
                    onPress={() => setShow(false)}>
                    <Animatable.View
                      animation={'zoomIn'}
                      delay={100}
                      style={{
                        flexDirection: item.user === '2' ? 'row' : 'column',
                      }}>
                      {item.user === '2' && (
                        <Image
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            marginRight: 10,
                            backgroundColor: '#000',
                          }}
                          source={{uri: item.profileImage}}
                        />
                      )}
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShow(false)}
                        onLongPress={() => {
                          setShow(true);
                          setKey(index);
                        }}
                        style={[
                          styles.messageContainer,
                          {
                            alignSelf:
                              item.user === '1' ? 'flex-end' : 'flex-start',
                            marginBottom: item.react != null ? 25 : 10,
                          },
                        ]}>
                        <LinearGradient
                          colors={['#fff', '#fff']}
                          style={{
                            borderRadius: 12,
                            maxWidth: windowWidth - 120,
                          }}>
                          {isValidHttpUrl(item.message) ? (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => {
                                const send = Linking.openURL(item.message);
                                console.log(send);
                              }}>
                              <Text
                                style={{
                                  alignSelf:
                                    item.user === '1'
                                      ? 'flex-end'
                                      : 'flex-start',
                                  color: 'black',
                                  fontFamily: 'Quicksand-SemiBold',
                                  paddingHorizontal: 10,
                                  paddingTop: 5,
                                  fontSize: 14,
                                  textDecorationLine: 'underline',
                                }}>
                                {item.message}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <Text
                              style={{
                                alignSelf:
                                  item.user === '1' ? 'flex-end' : 'flex-start',
                                color: 'black',
                                fontFamily: 'Quicksand-SemiBold',
                                paddingHorizontal: 10,
                                paddingTop: 5,
                                fontSize: 14,
                              }}>
                              {item.message}
                            </Text>
                          )}
                          <Text
                            style={{
                              alignSelf: 'flex-end',
                              color: '#bbb',
                              fontFamily: 'Quicksand-Medium',
                              fontSize: 11,
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                            }}>
                            {item.time}
                          </Text>

                          {item.react != null && (
                            <View
                              style={{
                                position: 'absolute',
                                backgroundColor: '#000',
                                padding: 5,
                                borderRadius: 20,
                                elevation: 5,
                                bottom: -17,
                                left: 10,
                                flexDirection: 'row',
                              }}>
                              {item.react.map((item, index) => {
                                return (
                                  <Text
                                    key={index}
                                    style={{
                                      fontSize: 15,
                                      color: '#eee',
                                      marginHorizontal: 5,
                                    }}>
                                    {item.reaction === 'heart'
                                      ? '❤️'
                                      : item.reaction === 'smile'
                                      ? '😄'
                                      : item.reaction === 'happy'
                                      ? '😂'
                                      : ''}
                                  </Text>
                                );
                              })}
                            </View>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animatable.View>

                    {show && key === index && (
                      <Animatable.View
                        animation={'bounceIn'}
                        style={{
                          height: 60,
                          width: 250,
                          backgroundColor: '#000000',
                          position: 'absolute',
                          borderRadius: 20,
                          paddingHorizontal: 10,
                          top: -30,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'center',
                          // item.user === '1' ? 'flex-start' : 'flex-end',
                          elevation: 10,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            setShow(false);
                            alert('❤️');
                          }}>
                          <Text style={{fontSize: 28, color: '#eee'}}>❤️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            setShow(false);
                            alert('😍');
                          }}>
                          <Text style={{fontSize: 30, color: '#eee'}}>😍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            setShow(false);
                            alert('😄');
                          }}>
                          <Text style={{fontSize: 30, color: '#eee'}}>😄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            setShow(false);
                            alert('😂');
                          }}>
                          <Text style={{fontSize: 30, color: '#eee'}}>😂</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{marginLeft: 10, marginRight: 5}}
                          activeOpacity={0.8}>
                          <Text style={{fontSize: 40, color: '#eee'}}>+</Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              placeholder="Enter Message"
              placeholderTextColor={'#ccc'}
              value={message}
              style={styles.input}
              onChange={e => setMessage(e.target.value)}
            />
            <View style={styles.sendContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={sendMessage}
              >
                <Text style={styles.send}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    opacity: 1,
  },
  Container: {
    height: windowHeight - 90,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    borderRadius: 12,
    elevation: 5,
  },
  InputContainer: {
    height: 70,
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  input: {
    paddingLeft: 20,
    padding: 10,
    color: 'black',
    fontFamily: 'Quicksand-Medium',
    borderRadius: 25,
    elevation: 5,
    backgroundColor: 'white',
  },
  sendContainer: {
    position: 'absolute',
    right: 15,
    top: 5,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  send: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    paddingTop: 8,
    paddingBottom: 11,
    paddingHorizontal: 15,
  },
});
