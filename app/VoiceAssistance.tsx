import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './WelcomeStyles';
import * as Speech from 'expo-speech';

const VoiceAssistance = ({navigation}) => {
  const  handleNext = () => {
    
    Speech.stop();
    navigation.navigate('VoiceChatter');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Product Order Delivery Voice Assistance</Text>
          <Text style={styles.subtitle}>Non AI Based Powered By Blue Machines</Text>
          <Text>Please use a quite area or no background noise</Text>
          <Text>When you click on microphone wait 4 secs before you start speaking</Text>
          
        </View>
        <MaterialCommunityIcons name="account-tie-voice" size={200}
          style={{ marginBottom: 10, marginLeft: 20, color: 'darkblue' }}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Start Voice Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default VoiceAssistance;
