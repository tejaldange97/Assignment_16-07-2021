import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Pie from 'react-native-pie';

export default function Home({}) {
  const json = useState([
    {
      percentage: 10,
      color: '#C70039',
    },
    {
      percentage: 20,
      color: '#44CD40',
    },
    {
      percentage: 30,
      color: '#404FCD',
    },
    {
      percentage: 40,
      color: '#EBD22F',
    },
  ]);

  return (
    <View style={styles.container}>
      <Pie
        radius={80}
        sections={[
          {
            percentage: 10,
            color: '#C70039',
          },
          {
            percentage: 20,
            color: '#44CD40',
          },
          {
            percentage: 30,
            color: '#404FCD',
          },
          {
            percentage: 40,
            color: '#EBD22F',
          },
        ]}
        strokeCap={'butt'}
      />
      <Text>Pie Chart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
});
