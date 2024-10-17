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

  const initialMessages: IMessage[] =
  [
    {
      _id: 1,
      text: 'Hi there! How can I assist you today?',
      createdAt: new Date(),
      system: true,
      user: { _id: 1 }
    },
  ];



  
  let [recording, setRecording] = useState(false);
  let [recorded, setRecorded] = useState(false);
  let [answering,setAnswering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  let [questionresponse, setQuestions] = useState(['']);
  const [messages, setMessages] = useState(initialMessages);

  
  let [recivedtone,setReceivedTone] =useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('');



  let [result, setResult] = useState('');
  let [botResults,setBotResults] =useState([]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    const text:any  = messages[0] ;
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages, Platform.OS !== 'web');
    })
    processTranscription(text);
  }, []);

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  }
  const readTheAnswer = (message: string) => {
    setSpeaking(true);
    Speech.speak(message);
  }

  var service:QuestionsMarkerCheckService = new QuestionsMarkerCheckService();

  const stopRecording = async () => {

    console.log("== stopRecording ");

    try {
      await Voice.stop();
      setRecording(false);

      console.log("== stopRecording: ", result);

      const newMsg = {
        _id: Math.round(Math.random() * 1000000),
        text: result,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User',
        }
      };

      const newMessage:any = [newMsg]

      setMessages((previousMessages) => {
        return GiftedChat.append(previousMessages, newMessage, Platform.OS !== 'web');
      })

      if (result) {
        processTranscription(result);
      }

    } catch (error: any) {
      console.log("== eror when stop: ", error);
      setErrorMsg(error.message)
    }

  }

  const startRecording = async () => {

    console.log("== startRecording ");
    setRecording(true);
    Tts.stop();

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };


  const processTranscription = async (prompt: string) => {

    
    if (prompt.trim().length > 0) {

      setAnswering(true);
      service.fetchLanguageChain(prompt.trim()).then((res: any) => {
        console.log( res[0]);
        if (res.success) {
          setAnswering(false);

          const newMsg = {
            _id: Math.round(Math.random() * 1000000),
            text: res.data,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Assistant',
            }
          };

          const newMessage:any = [newMsg]
          setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, newMessage, Platform.OS !== 'web');
          })

          if (voice) {
            readTheAnswer(res.data);
          }

        } else {
          setAnswering(false);
          setErrorMsg(res.msg);

        }

      })
    }


  }


  const renderSend = (props: any) => {
    return (


      <View>
      
       <View>
        <Send  containerStyle={{
        backgroundColor: "white",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        width:200,
        padding: 20  
      }} {...props}>
          <MaterialCommunityIcons name="send"
            style={styles.buttonSend} size={30}
          />
        </Send>
        </View>
        <View style={styles.buttonMicStyle}>
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}>
          {recording ?
            <MaterialCommunityIcons name='stop' size={30} /> :
            <MaterialCommunityIcons name='microphone' size={30}/>}
        </TouchableOpacity>
    
        </View>
         </View>
    );
  };

  const scrollToBottomComponent = () => {
    return <MaterialCommunityIcons name="arrow-down-circle-outline" size={28} color="#10a37f" />;
  };




  useEffect(() => {


    Voice.onSpeechStart = (e) => {
      setErrorMsg('');
      setRecording(true);
    };

    Voice.onSpeechEnd = (e) => {
      setRecording(false);
    };


    Voice.onSpeechError = (e: any) => {
      const errMsg: string = e.error?.message;

      if (errMsg.includes('No match')) {
        setErrorMsg("You are not speaking!");
      } else {
        setErrorMsg(errMsg);
      }

      setRecording(false);
    }

    Voice.onSpeechResults = (e: any) => {
      const prompt = e.value[0];
      if (!prompt) {
        return;
      }
      setResult(prompt);
    };


    setMessages(initialMessages);


    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.stop();
    };
  }, []);

 
 
  

  // send this data to text model No AI and retreive answers 

  return (
    <SafeAreaView style={styles.containerChat}>
    


      <GiftedChat messagesContainerStyle={styles.containerChatBox}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
          name: 'User',
          avatar: ''
        }}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
       


    
  </SafeAreaView>
  );
};



export default VoiceChatter;