import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ButtonOutline from '../Components/ButtonOutline';
import InputOutLine from '../Components/InputOutLine';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const LoginHandle = () => {
    userName == 'user'
      ? navigation.navigate('user')
      : navigation.navigate('Admin');
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../Assets/Icons/company.png')}
      />
      <Image
        resizeMode="contain"
        style={styles.bottom}
        source={require('../Assets/UI/bottomDesign.png')}
      />
      <Text style={styles.InnerText}>Welcome to our App</Text>
      <View style={styles.inputContainer}>
        <InputOutLine
          text={'User Name'}
          value={userName}
          changeValue={setUserName}
        />
        <InputOutLine
          text={'password'}
          value={password}
          changeValue={setPassword}
        />
      </View>
      <ButtonOutline text={'LOGIN'} fontSize={28} action={LoginHandle} />
    </View>
  );
};

export default Login;

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: Height, position: 'relative'},
  logo: {width: Width * 0.8, alignSelf: 'center'},
  inputContainer: {
    alignSelf: 'center',
    width: Width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {width: Width, position: 'absolute', top: Height * 0.45},
  InnerText: {
    bottom: Height * 0.09,
    alignSelf: 'center',
    color: '#28209C',
    fontSize: 20,
  },
});
