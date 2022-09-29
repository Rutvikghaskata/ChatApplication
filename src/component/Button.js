import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Button = props => {
  const {onSubmit, value} = props;
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={onSubmit}>
      <LinearGradient
        colors={['#28056a', '#872ba3']}
        style={styles.linearGradient}>
        <Text style={styles.value}>{value ? value : 'button'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'navy',
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 10,
    backgroundColor: '#fff',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Button;
