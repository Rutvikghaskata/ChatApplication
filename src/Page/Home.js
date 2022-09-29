import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CallScreen, ChatListScreen, ProfileScreen} from '../router';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.bottomView}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: isFocused ? '#673ab7' : '#fff'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const App = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{headerShown:false}}>
      <Tab.Screen name="call" component={CallScreen} />
      <Tab.Screen name="chatlist" component={ChatListScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    height: 60,
    marginBottom: 20,
    width: '85%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius:30,
    overflow:'hidden',
    backgroundColor:'#000',
    shadowColor: '#673ab7',
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 10,
  },
});
