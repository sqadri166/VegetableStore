import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ImageBackground, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (

 <ThemedView style={styles.container}>

  <ImageBackground source={require('../../assets/images/merypyarisubzee.png')} resizeMode="cover" style={styles.image}/>
  <ThemedText type="title">Subzee Market Provides</ThemedText>

  <ThemedText>
    Vegetables are parts of plants that are consumed by humans or other animals as food , We provide excellent quality of vegetables and fruits
    fresh and canned box vegetable services. 
  </ThemedText>
   </ThemedView>

    
     
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
    
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
