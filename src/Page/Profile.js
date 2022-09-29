import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'

const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('call');
        }}>
        <Text style={{color: 'black'}}>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile