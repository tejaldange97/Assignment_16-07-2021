import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

import {TextInput, Text, StyleSheet, View, ScrollView} from 'react-native';
import CustomButton from '../Components/CustomButton';
const Registration = ({navigation}) => {
  const [name, setName] = useState('');
  const [mob, setMob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const setData = async () => {
    const reg1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reg2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (name.length == 0) {
      alert('Please Enter Name');
    } else if (reg1.test(email) === false) {
      alert('Please Enter Email');
    } else if (mob == '' || mob.length != 10) {
      alert('Please Enter Mobile Number');
    } else if (password.length == 0) {
      alert('Please Enter Password');
    } else if (reg2.test(password) === false) {
      alert('Enter Strong Password');
    } else if (rePassword.length == 0) {
      alert('ReEnter Password');
    } else if (password !== rePassword) {
      alert('Password not match');
    } else if (reg2.test(rePassword) === false) {
      alert('Enter Strong Password');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql('INSERT INTO Users (Name, Age) VALUES (?,?)', [
            name,
            mob,
          ]);
        });
        navigation.navigate('Login');
        alert('Registration Successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };
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

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
      );
    });
  };

  useEffect(() => {
    createTable();
  }, []);
  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={[styles.body, {marginTop: 50, marginBottom: 20}]}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={value => setName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile no"
            onChangeText={value => setMob(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={value => setPassword(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Retype the Password"
            onChangeText={value => setRePassword(value)}
          />
          <CustomButton title="Login" onPress={setData} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
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

export default Registration;
