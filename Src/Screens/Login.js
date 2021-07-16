import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import CustomButton from '../Components/CustomButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [name1, setName1] = useState('');
  const [age1, setAge1] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            setName1(userName);
            setAge1(userAge);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0) {
      alert('Please Enter Name');
    } else if (age == '' || age.length != 10) {
      alert('Please Enter Mobile Number');
    } else {
      if (name == name1 && age == age1) {
        navigation.navigate('Home');
      } else {
        alert('user not register');
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text} />

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Mobile Number"
        onChangeText={value => setAge(value)}
      />
      <CustomButton title="Login" color="#1eb900" onPress={setData} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 200,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 130,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
