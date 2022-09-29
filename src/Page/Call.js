import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';

const Call = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('profile');
        }}>
        <Text style={{color: 'black'}}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Call;
