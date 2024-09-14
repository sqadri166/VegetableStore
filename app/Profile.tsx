import React ,  {useState} from 'react';
import auth from '@react-native-firebase/auth';

import {NavigationContainer, useNavigation}  from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import { Button, View, Text, ScrollView ,StyleSheet ,Platform, StatusBar, TextInput} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Profile = ({ navigation }) => {
  const handleUpdateProfile = () => {
    // Logic for updating profile (e.g., API call)
    console.log('Updating profile...');
  };

  const handleChangePassword = () => {
    // Logic for changing password (e.g., API call)
    console.log('Changing password...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Profile</Text>
      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput style={styles.input} placeholder="Email Address" />
      <View style={styles.buttonContainer}>
        <Button title="Update Profile" onPress={handleUpdateProfile} />
      </View>

      <Text style={styles.label}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Change Password" onPress={handleChangePassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default Profile;
