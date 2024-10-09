// Import necessary components and libraries
import Voice, { } from '@react-native-voice/voice';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, Rationale, TouchableHighlight, SafeAreaView, TouchableOpacityBase, TouchableOpacity, StatusBar } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './WelcomeStyles';
import {QuestionsMarkerCheckService} from './services/QuestMarkerCheckService'
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux'
import {db} from '../Firebase';
import { doc, setDoc } from "firebase/firestore"; 

import { collection, getDocs } from "firebase/firestore";
import {stylesBubble} from './ChatBubbleStyle'


import {
    Bubble,
    GiftedChat,
    IMessageUser,
    Send,
  } from 'react-native-gifted-chat'
import Tts from 'react-native-tts';
import * as Speech from 'expo-speech';
import voice from "@react-native-voice/voice";

// You need to /replace it with Firebase Data 

// imeplement Login Feature with Firestore Authentication and insert that user Id in route navigation 
const VoiceChatter = ({navigation}) => {


  
  let [recording, setRecording] = useState(false);
  let [recivedtone,setReceivedTone] =useState(false);


  let [results, setResults] = useState([]);
  let [botResults,setBotResults] =useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const onSpeechResults = (result:any) => {
    setResults(result.value);
    // Match results with the Firestore DB 
     
  
  };

  const onSpeechError = (error:any) => {
    console.log(error);
  };

  const  startSpeechToText = async () => {
    
    await voice.start("en");
    setRecording(true);
    setResults([]);
    

  };

  const  stopSpeechToText = async () => {
    
    await voice.stop();
    setRecording(false);
    

  };

  // send this data to text model No AI and retreive answers 

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.title}>Start Speaking Now</Text>

      {!recording ? <TouchableOpacity style={styles.container} onPress={startSpeechToText}>  
        <MaterialCommunityIcons name="microphone" size={50}
          style={{ marginBottom: -60, marginLeft: 0, color: 'darkred' }}
        />        
        
        </TouchableOpacity>  : undefined }
        {recording ? <TouchableOpacity style={styles.container} onPress={stopSpeechToText}>  
        <MaterialCommunityIcons name="stop" size={50}
          style={{ marginBottom: -60, marginLeft: 0, color: 'darkred' }}
        />        
        
        </TouchableOpacity>  : undefined }

    
       
        <View style={styles.container}>
        {results.map((item, index) => 
        
        <View style={{
                    backgroundColor: "#0078fe",
                    padding:10,
                    marginLeft: '45%',
                    borderRadius: 5,
                    //marginBottom: 15,
                    marginTop: 5,
                    marginRight: "5%",
                    maxWidth: '50%',
                    alignSelf: 'flex-end',
                    //maxWidth: 500,

                  }} key={index}>


                    <Text style={{ fontSize: 16, color: "#fff", }} key={index}>{item}</Text>

                      <View style={stylesBubble.rightArrow}></View>

                      <View style={stylesBubble.rightArrowOverlap}></View>



</View>   )}
                              
       </View>

       
        </View>
 
  </SafeAreaView>
  );
};



export default VoiceChatter;