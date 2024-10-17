
import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import ChatBubble from "react-native-chat-bubble";

const VoiceChatBubble: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.container}>Customer Live Agent Product Information Agent </Text>  
      <ChatBubble
        isOwnMessage={true}
        bubbleColor="#1084ff"
        tailColor="#1084ff"
        withTail={true}
        style={styles.chatBubble}
      >
        <Text style={styles.textOwn}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas atque repudiandae alias nisi aut? Ut perferendis similique non vel! Blanditiis nihil enim culpa ex numquam commodi saepe? Non, ex recusandae.</Text>
      </ChatBubble>
      <ChatBubble
       onPress={() => Alert.alert("Hi", "This is alert")}
        isOwnMessage={false}
        bubbleColor="lightgrey"
        withTail={true}
        style={styles.chatBubble}
      >
        <Text style={styles.text}>hi.</Text>
      </ChatBubble>
      <ChatBubble
        isOwnMessage={true}
        bubbleColor="#1084ff"
        tailColor="#1084ff"
        withTail={true}
        style={styles.chatBubble}
      >
        <Text  style={styles.textOwn}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas atque repudiandae alias nisi aut? Ut perferendis similique non vel! Blanditiis nihil enim culpa ex numquam commodi saepe? Non, ex recusandae.</Text>
      </ChatBubble>
      <ChatBubble
        isOwnMessage={true}
        bubbleColor="#1084ff"
        tailColor="#1084ff"
        withTail={true}
        style={styles.chatBubble}
      >
        <Image style={{height:100, width:100}} 
        resizeMode="contain" 
        resizeMethod="resize"  
        source={{uri: "https://raw.githubusercontent.com/GFean/rn-gesture-swipeable-flatlist-example/main/assets/favicon.png"}}/>
      </ChatBubble>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   marginTop:100,
    flex: 1,
   paddingHorizontal:10
  },
  chatBubble: {
    padding: 10,
  },
  text: {
    color: 'black',
  },
  textOwn: {
   color: 'white',
 },
});

export default VoiceChatBubble
