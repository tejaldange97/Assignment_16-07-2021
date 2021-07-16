import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{backgroundColor: '#00000050'}, styles.button, {...props.style}]}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
});

export default CustomButton;
