import { Link, Stack, useNavigation } from 'expo-router';
import { Image, Text, View, StyleSheet, ImageBackground, Button } from 'react-native';

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: '../../assets/images/merypyarisubzee.png' }} />
  );
}

const image = {uri: 'merypyarisubzee.png'};


const SubzeeBackground = () => (
  <View style={styles.container}>
    <ImageBackground source={require('../../assets/images/merypyarisubzee.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Veg Subzi Market</Text>

    </ImageBackground>
  

  </View>
);


export default function Home() {
  
const navigation = useNavigation();
const GoToProfile = () => { navigation.navigate('Listings') }


  return (
     <><SubzeeBackground /><Button onPress={GoToProfile}
      title="Click Here to Place Order"
      color="#841584"
      accessibilityLabel="Learn more about this purple button" /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
