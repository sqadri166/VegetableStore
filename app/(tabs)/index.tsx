import { Link, Stack, useNavigation } from 'expo-router';
import { Image, Text, View, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: '../../assets/images/merypyarisubzee.png' }} />
  );
}

const image = {uri: 'merypyarisubzee.png'};


const SubzeeBackground = () => (


  <View style={styles.container}>
    <ImageBackground source={require('../../assets/images/merypyarisubzee.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Owais Whole Sales Food Item Delivery </Text>

    </ImageBackground>
  
   
    

  </View>



);


export default function Home() {
  const navigation = useNavigation();
 const GoToProfile = () => { navigation.navigate('Listings') }


  return (
    <View style={styles.container}>
    <SubzeeBackground />
     <View>
     <TouchableOpacity
           style={styles.ShowMoreScreenButton}
           onPress={GoToProfile}>
           
           <Text style={styles.loginText}>Click Here To Order</Text>
  </TouchableOpacity> 
  </View>
  <View>
  <TouchableOpacity
           style={styles.SpeakMoreScreenButton}
           onPress={GoToProfile}>
           
           <Text style={styles.voicenText}>Click to Open Voice Chat</Text>
  </TouchableOpacity> 
  
  
     </View>
 
    </View>
     
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBottom: {
    flex: 0.8,
    marginTop: 400
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    flex: 0.9,
    justifyContent: 'center',
  },
  text: {
    color: 'darkred',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  ShowMoreScreenButton:{
    marginRight:40,
    marginLeft:70,
     marginTop: -70,
    paddingTop:10,
    paddingBottom:10,

    backgroundColor:'green',
    borderRadius:10,
    borderWidth: 1,
    height:50 ,
    width:280,
    
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#fff'
  },

  SpeakMoreScreenButton:{
    marginRight:40,
    marginLeft:70,
     marginTop:10,
    paddingTop:10,
    paddingBottom:10,

    backgroundColor:'darkblue',
    borderRadius:10,
    borderWidth: 1,
    height:50 ,
    width:280,
    
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#fff'
  },
  loginText:{
    color:'white',
    textAlign:'center',
    fontWeight:"bold",
    paddingLeft : 75 ,
    paddingRight : 10
},
voicenText:{
  color:'white',
  textAlign:'center',
  fontWeight:"bold",
  paddingLeft : 60 ,
  paddingRight : 10
}
});
