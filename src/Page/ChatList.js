import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const ChatList = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('call');
        }}>
        <Text style={{color: 'black'}}>ChatList</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatList;
