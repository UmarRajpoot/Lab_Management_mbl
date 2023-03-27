import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({onPress, title, styles}) => {
  return (
    <TouchableOpacity
      style={[styles, {width: '50%'}]}
      activeOpacity={0.6}
      onPress={onPress}>
      <LinearGradient
        colors={['#FEAC5E', '#C779D0', '#4BC0C8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          backgroundColor: 'pink',
          padding: 15,
          borderRadius: 20,
          elevation: 4,
        }}>
        <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
