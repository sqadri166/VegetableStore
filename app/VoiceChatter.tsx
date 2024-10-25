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


import { NativeModules } from 'react-native';



import {
    Bubble,
    GiftedChat,
    IMessage,
    Send,
  } from 'react-native-gifted-chat'
import Tts from 'react-native-tts';
import * as Speech from 'expo-speech';
import voice from "@react-native-voice/voice";
import { Ranking } from './Ranking';

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


  let productInformation:any = [{}];
  
  let [recording, setRecording] = useState(false);
  let [recorded, setRecorded] = useState(false);
  let [answering,setAnswering] = useState(false);
  const[questionMatched, setMatchStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  let [questionresponse, setQuestions] = useState('');
  let [messages, setMessages] = useState(initialMessages);

  
  let [recivedtone,setReceivedTone] =useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('');
  let [products,setProducts] = useState(productInformation);

  let [questionhints, setQuestionHints] = useState([]);
  let [questionBank, setQuestionBank] = useState([]);


  let [result, setResult] = useState('');
  let [botResults,setBotResults] =useState([]);



  const fetchProducts = async () => {

    await getDocs(collection(db, "Products"))
        .then((querySnapshot)=>{               
            const newData:any = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
              
             setProducts(newData);                
        })


}


const fetchQuestionHints = async () => {

  await getDocs(collection(db, "QuestionHints"))
      .then((querySnapshot)=>{               
          const newData:any = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
           setQuestionHints(newData);                
      })

      
}


const fetchQuestionBank = async () => {

  await getDocs(collection(db, "Questions"))
      .then((querySnapshot)=>{               
          const newData:any = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
           setQuestionBank(newData);                
      })

      
}


 const rankingAndIndexAnalysisOfQuestions = async (question: any) => {
    // Rank the Works
               const words = question.split(' ');

          
          
                 var currentIndexing:any = [{}]
                 var index = 0;
                 var currentpropmtIndexWord:any;
                 var currentQuestion:any;


                  for(var i =0 ; i < words.length ; i++)
                  {
                      const current:Ranking = {Rank: index++ , Word: words[i]  };
                      currentIndexing.push(current);

                  }
                  // Compare this index with repository 
                  // index by index 

                  for(var m=0 ; m < questionBank.length; m++)
                  {
                          if(currentIndexing.length > m )
                          {
                              // fetch word 
                               currentpropmtIndexWord = currentIndexing[m] ;
                              
                          }
                          // look for that word and index match if match its true , all true means parsed successfully 
                          currentQuestion = questionBank[m];
                         // each word is in order with exception of 1 
                         // ask for confirmation of question 
                         // reply Yes and Generate  


                  }

 }

  const fetchLanguageChain:any =   async (currentPrompt:any) => {
  
    const answer:any =[] ;
    var data:any = [{}];

          try {
             if(products.length > 0 )
              {
          
                  const words = currentPrompt.split(' ');
                  for(var i =0 ; i < words.length ; i++)
                  {
                     data = products.filter(function(el:any) {
                      return words[i].toLowerCase() === el.ProductName.toLowerCase()
                     });
                    
                    if(data.length > 0 ) 
                    {
                        console.log("Product Match Found here for " + data[0].ProductName);
                        break;
                    } 

                   
                  }
                  // you find a product match means time to feed Question Hint First
                  if(data.length > 0 ) 
                  {
                    console.log("Data Found for product " + data[0].ProductName);
                  
                   
                    for(var i=0 ; i < questionBank.length ; i++)
                    {
                      // this from Data base real time 
                       answer.push({Question:questionBank[i].Question.replace("{ProductName}",data[0].ProductName).replace("{Quantity}", "1").replace("{weightRefs}","pounds or boxes") , HumanQuestion:questionBank[i].HumanQuestion }); 
                    }

                    answer.push({Question:"You can ask Proper Questions like below otherwise the Bot will not help" , HumanQuestion: "For example I would like to know the price of this Product"  });
                    answer.push({Question: "You must ask proper questions like whats the price of " + data[0].ProductName + ", I want to order product , you must name your product name like I want to order 5 bags of Tomatoes or other Product " , HumanQuestion:"Whats the weight of 1 bag of Tomatoes" }); 
                 
                    answer.push({Question: "We found a product match for your product " + data[0].ProductName , HumanQuestion: "Tell me more about this Product"}) ;
                         
                    
                  }
                  else 
                  {
                    answer.push({Question: "We didnt found a product match for your question [ " + currentPrompt + "]"  , HumanQuestion: "You can ask for example Do you have Tomatoes or Potatoes or bag of Onions"  }); 
                    
                    
                    answer.push({Question: "You must ask proper questions like whats the price of product , I want to order product , you must name your product name like I want to order 5 bags of Potatoes " , HumanQuestion: "give me more information about this Product" }); 
                    

                  


                  }

                  
                }
               const composed =   answer;
               console.log("Message response composed as== " + answer);
              return Promise.resolve({ success: true, data: composed });
      
    } catch (error:any) {
      return Promise.resolve({ success: false, msg: error });
      
    }
  }
  



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


  const stopRecording = async () => {

    console.log("== stopRecording ");

    try {
      await Voice.stop();
      setRecording(false);

      console.log("== stopRecording: ", result);

      // delay needed here to remove listener 

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
        console.log("resultfound");
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
    setResult(''); 
    try {
      await Voice.start('en-US',{REQUEST_PERMISSIONS_AUTO: true});
    } catch (e) {
      console.error(e);
    }
  };

// Take the sentence and sort by Rank then match each token with similar Rank 
// Return true id Rank for expample {prcie} , {weightRefs} , rank matched index then replace like numbers to Quantity 
// And then analyze to confirm would you like to Order 5 bags of Tomatoes 
// Replies yes 
// Creating Order Generate Invoice 

const sortAndIndexSentence = async () => {



} ;


  const processTranscription = async (prompt: string) => {

     var newMsg:any ;
     var newMessage:any = [{
      _id: Math.round(Math.random() * 1000),
      text: "replying wait ..."  ,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Assistant',
      }
    }];
     var questionData:any ;
     
    if (prompt.trim().length > 0) {

      
      setAnswering(true);

      await fetchLanguageChain(prompt.trim()).then((res: any) => {
        console.log(res.msg);
        var repliedBotAnswers = [];
        if (res.success) {
           repliedBotAnswers = res.data;

          setAnswering(false);
          console.log("Response time " + res.data);
          
          for(var m= 0 ; m < repliedBotAnswers.length ; m++ )
          {
            
              newMsg = {
                _id: Math.round(Math.random() * 1000),
                text: repliedBotAnswers[m].Question.toString() ,
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: 'Assistant',
                }
              };
              newMessage.push(newMsg);
          }
           

        setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, newMessage, Platform.OS !== 'web');
          })
         
          if (voice) {
            readTheAnswer(newMsg.text);
          }
          
        
        }
        else {
          setAnswering(false);

          setErrorMsg('No Answer Replied from Voice Assitance Systems');

        }
      
      

      
    });

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
  fetchProducts();
  fetchQuestionHints();
  fetchQuestionBank();

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
    <SafeAreaView style={styles.Giftcontainer}>
    


      <GiftedChat messagesContainerStyle={styles.Giftcontainer}
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